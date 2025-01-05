import { Router } from "express";
import { ADMIN_KEY } from "../lib/keys";

const router = Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/validate", (req, res) => {
  if (req.body.key != ADMIN_KEY) res.status(401).send("invalid key");
  else {
    res.cookie("key", req.body.key, { maxAge: 60000 });
    res.redirect("/admin");
  }
});

export default router;