import { Router } from "express";
import Registration from "../../model/Registration";
import { sendPaymentVerifiedMail } from "../../lib/mailing";

const router = Router();

router.get("/", async (req, res) => {
  const payments = await Registration.find(
    { isVerified: false },
    "name phoneno upiId"
  );
  res.render("admin/payments/index", { payments });
});

router.post("/verify", async (req, res) => {
  try {
    const body = req.body;
    const reg = await Registration.findById(body.id);

    if (!reg) {
      res.status(404).send("Registration not found");
      return;
    }
    if (typeof body.valid != "boolean") {
      res.status(400).send("Valid should be present as a boolean");
      return;
    }

    reg.isVerified = true;
    reg.isValid = body.valid;
    await reg.save();
    res.sendStatus(200);
    sendPaymentVerifiedMail([reg.mails[0]], String(reg.upiId), Boolean(reg.isValid));
  } catch (e) {
    res.status(400).send("Verification Failed");
  }
});

router.get("/all", async (req, res) => {
  try {
    const payments = await Registration.find(
      {},
      "name phoneno upiId isVerified isValid"
    );
    console.log(payments);
    res.render("admin/payments/all", { payments });
  } catch (e) {
    res.sendStatus(404);
  }
});

export default router;
