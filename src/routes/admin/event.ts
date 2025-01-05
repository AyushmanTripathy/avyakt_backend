import { Router } from "express";
import Event from "../../model/Event";

const router = Router();

const processRules = (x: string) =>
  x
    .split("\n")
    .map((x) => x.replace("\r", "").trim())
    .filter(Boolean);

router.get("/", async (req, res) => {
  res.render("admin/event", {
    events: await Event.find({}),
  });
});

router.get("/add", (req, res) => {
  res.render("admin/event/add", {
    message: "Fill the required info",
  });
});

router.post("/add", async (req, res) => {
  try {
    const body = req.body;
    const event = new Event({
      name: body.name,
      dateTime: body.dateTime,
      memberCount: body.memberCount,
      status: body.status,
      fee: body.fee,
      rules: processRules(body.rules),
      category: body.category,
      gender: body.gender,
      imageURL: body.imageURL,
    });
    await event.save();
    res.status(200).redirect("/admin/event");
  } catch (e) {
    res.status(400).render("admin/event/add", {
      message: "Operation Failed",
    });
  }
});

router.get("/update/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).exec();
    if (!event) res.status(404).send("id not found");
    else
      res.render("admin/event/update", {
        message: "Change info & update",
        event,
      });
  } catch (e) {
    res.status(400).send("invalid request");
  }
});

router.post("/update", async (req, res) => {
  try {
    const body = req.body;
    await Event.findByIdAndUpdate(body.id, {
      name: body.name,
      dateTime: body.dateTime,
      memberCount: body.memberCount,
      status: body.status,
      fee: body.fee,
      rules: processRules(body.rules),
      category: body.category,
      gender: body.gender,
      imageURL: body.imageURL,
    });
    res.status(200).redirect("/admin/event");
  } catch (e) {
    res.status(400).render("admin/event/update", {
      message: "Operation Failed",
    });
  }
});

export default router;
