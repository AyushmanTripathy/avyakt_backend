import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.render("admin/notifications");
});

router.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).redirect("/");
  } catch(e) {
    res.status(500).send("Notification Failed");
  }
});

export default router;
