import express from "express";
import { insertOrder } from "../model/orderModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // const {
    //   name,
    //   email,
    //   phone,
    //   address,
    //   status,

    //   currency,
    //   payment_method,
    //   amount,
    // } = req.body;
    // const dta = {
    //   name,
    //   email,
    //   phone,
    //   address,
    //   status,

    //   currency,
    //   payment_method,
    //   amount,
    // };

    const result = await insertOrder(req.body);
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
