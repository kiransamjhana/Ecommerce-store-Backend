import express from "express";
import {
  getOrderByEmail,
  getOrders,
  insertOrder,
} from "../model/orderModel.js";
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
    console.log(result);
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

//getmethod
router.get("/", async (req, res) => {
  try {
    const order = await getOrders();
    res.json({
      status: "success",
      message: "Here is order the list of orders",
      order,
    });
  } catch (error) {
    error;
  }
});

// router.get("/email-user", async (req, res) => {
//   try {
//     const email = req.params;
//     console.log(req.params);
//     const order = await getOrderByEmail(email);
//     res.json({
//       status: "success",
//       message: "Here is order associated with the email",
//       order,
//     });
//   } catch (error) {
//     error;
