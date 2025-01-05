import { Router } from "express";
import { validateKey } from "../lib/keys";

const router = Router();

router.use((req, res, next) => {
  if (validateKey(req)) next();
  else res.status(401).redirect("/");
});

router.get("/", (req, res) => {
  res.render("admin/index");
});

export default router;
