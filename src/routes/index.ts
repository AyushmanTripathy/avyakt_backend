import { Router } from "express";
import { ADMIN_KEY, validateKey } from "../lib/keys";
import adminRouter from "./admin/index";
import apiRouter from "./api";

const router = Router();

router.use("/admin", adminRouter);
router.use("/api", apiRouter);

router.get("/", (req, res) => {
  if (validateKey(req)) res.redirect("/admin");
  else res.render("login");
});

router.post("/validate", (req, res) => {
  if (req.body.key != ADMIN_KEY) res.status(401).send("invalid key");
  else {
    res.cookie("key", req.body.key, { maxAge: 3600000 });
    res.redirect("/admin");
  }
});


export default router;
