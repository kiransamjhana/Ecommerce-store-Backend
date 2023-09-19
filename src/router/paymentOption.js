import express from "express";
import {
  getAllPymentOption,
  getPayementOpton,
} from "../model/paymentOption.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getAllPymentOption();
    res.json({
      status: "success",
      message: "Here are the list of payment options",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:_id?", async (req, res, next) => {
  try {
    const singlePyOp = await getPayementOpton();
    res.json({
      status: "success",
      message: "Here is the selected payment options",
      singlePyOp,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
