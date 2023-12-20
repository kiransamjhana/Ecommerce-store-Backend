import express from "express";
import stripe from "stripe";

const router = express.Router();
const stripeSecretKey = process.env.SECREATE_KEY;
const stripeInstance = stripe(stripeSecretKey);

router.post("/", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
