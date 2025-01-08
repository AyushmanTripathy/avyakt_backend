import { Router } from "express";
import Event from "../model/Event";
import User from "../model/User";
import Registration from "../model/Registration";
import { CLIENT_KEY } from "../lib/keys";
import { validateEmail } from "../lib/utils";

const router = Router();

router.use((req, res, next) => {
  if (req.headers.authorization != CLIENT_KEY)
    res.status(401).send("CLIENT_KEY required in authorization header");
  else next();
});

router.post("/register", async (req, res) => {
  try {
    const body = req.body;

    const event = await Event.findById(body.eventId, "fee status memberCount");
    if (!event) {
      res.status(404).send("eventId not found");
      return;
    }
    if (event.memberCount != body.mails.length) {
      res.status(400).send("memberCount doesn't match mails length");
      return;
    }
    if (event.fee != 0 && !body.upiId) {
      res.status(403).send("UPI Id is required as event has fee of " + event.fee);
      return;
    }
    if (event.status != "ONGOING") {
      res.status(403).send("Event status is not ONGOING");
      return;
    }

    const reg = new Registration({
      name: body.name,
      mails: body.mails,
      eventId: body.eventId,
      phoneno: body.phoneno,
      isVerified: false,
    });

    const users = [];
    for (let i = 0; i < body.mails.length; i++) {
      const mail = body.mails[i];
      if (!validateEmail(mail)) {
        res.status(400).send(mail + " is invalid mail");
        return;
      }
      if (body.mails.indexOf(mail) != i) {
        res.status(400).send(mail + " is duplicated");
        return;
      }
      let user = await User.findOne({ mail });
      if (user) {
        if (user.registrations.includes(body.eventId)) {
          res.status(412).send(mail + " already registered");
          return;
        }
        user.registrations.push(body.eventId);
      } else user = new User({ mail, registrations: [body.eventId] });
      users.push(user);
    }

    if (body.upiId) reg.upiId = body.upiId;
    else {
      reg.isVerified = true;
      reg.isValid = true;
    }

    await reg.save();
    for (const user of users) await user.save();
    res.sendStatus(200);
  } catch {
    res.status(400).send("validation failed");
  }
});

router.get("/events/user/:mail", async (req, res) => {
  const eventIds = await User.findOne(
    { mail: req.params.mail },
    "registrations"
  ).exec();
  if (eventIds) res.send(eventIds.registrations);
  else res.send([]);
});

router.get("/events/all", async (req, res) => {
  const events = await Event.find({}).exec();
  res.send(events);
});

export default router;
