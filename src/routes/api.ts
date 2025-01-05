import { Router } from "express";
import Event from "../model/Event";
import User from "../model/User";
import Registration from "../model/Registration";
import { CLIENT_KEY } from "../lib/keys";

const router = Router();

router.use((req, res, next) => {
  if (req.headers.authorization != CLIENT_KEY)
    res.status(401).send("CLIENT_KEY required in authorization header");
  else next();
});

router.post("/register", async (req, res) => {
  try {
    const body = req.body;
    const reg = new Registration({
      name: body.name,
      mails: body.mails,
      eventId: body.eventId,
      phoneno: body.phoneno,
    });
    await reg.save();

    for (const mail of body.mails) {
      let user = await User.findOne({ mail });
      if (user) {
        if (user.registrations.includes(body.eventId)) {
          res.status(412).send(mail + " already registered");
          return;
        }
        user.registrations.push(body.eventId);
      } else user = new User({ mail, registrations: [body.eventId] });
      await user.save();
    }

    if (body.upiId) reg.upiId = body.upiId;
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
