import express from "express";
import { insertOrder } from "../model/orderModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { amount, currency, status } = req.body;
    console.log(req.body);
    const result = await insertOrder(amount, currency, status);
    result?._id
      ? res.json({
          status: "success",
          message: " New Order Has been Placed",
        })
      : res.json({
          status: "error",
          message: " Unable to process the order",
        });
  } catch (error) {
    error;
  }
});

export default router;
