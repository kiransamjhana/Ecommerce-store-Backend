import express from "express";
import stripe from "stripe";

const router = express.Router();
const stripeSecretKey =
  "sk_test_51Ntj4VBmvWylAIGl8ob4TvU4AYqRF9Dp8T6ppQ0HssSV43vRyXzBzLQh35A0HrjWpPXW13D2Z7TpPBmfgO7ODtkw00WViqaxp6";
const stripeInstance = stripe(stripeSecretKey);

router.post("/", async (req, res) => {
  const { amount, currency, paymentMethodType } = req.body;
  console.log(amount);
  console.log(currency);

  try {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: amount * 100,
      currency,
      payment_method_types: [paymentMethodType],
    });
    return res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
