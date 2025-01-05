import { Router } from "express";
import Event from "../model/Event";
import User from "../model/User";
import Registration from "../model/Registration";

const CLIENT_KEY = process.env.CLIENT_KEY;
if (!CLIENT_KEY) {
  console.error("CLIENT_KEY not present");
  process.exit(1);
}

const router = Router();

router.use((req, res, next) => {
  if (req.headers.authorization != CLIENT_KEY) 
    res.status(401).send("CLIENT_KEY required in authorization header");
  else next();
});

router.post("/register", async (req, res) => {
  try {
    const body = req.body;
    for (const mail of body.mails) {
      let user = await User.findOne({ mail });
      if (user) {
        if (user.registrations.includes(body.eventId)) {
          res.status(412).send(mail + " already registered");
          return;
        }
        user.registrations.push(body.eventId);
      } else user = new User({ mail, registrations: [body.eventId] });
      user.save();
    }

    const reg = new Registration({
      name: body.name,
      mails: body.mails,
      eventId: body.eventId,
      phoneno: body.phoneno,
    });
    if (body.upiId) reg.upiId = body.upiId;
    reg.save();
  } catch {
    res.status(400).send("validation failed");
  }
  res.sendStatus(200);
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
