import { Router } from "express";
import { validateKey } from "../../lib/keys";
import eventRouter from "./event";
import paymentsRouter from "./payments";

const router = Router();

router.use((req, res, next) => {
  if (validateKey(req)) next();
  else res.status(401).redirect("/");
});

router.use("/event", eventRouter);
router.use("/payments", paymentsRouter);

router.get("/", (req, res) => {
  res.render("admin/index");
});

export default router;
