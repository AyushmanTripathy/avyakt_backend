import { Router } from "express";
import { validateKey } from "../../lib/keys";
import eventRouter from "./event";

const router = Router();

router.use((req, res, next) => {
  if (validateKey(req)) next();
  else res.status(401).redirect("/");
});

router.use("/event", eventRouter);

router.get("/", (req, res) => {
  res.render("admin/index");
});

export default router;
