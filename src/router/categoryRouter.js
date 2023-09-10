import express from "express";
import { getCategoris, getCategoryById } from "../model/catagoryModel.js";
const router = express.Router();

router.get("/:_id?", async (req, res, next) => {
  try {
    console.log("inside router");
    const { _id } = req.params;
    const result = _id ? await getCategoryById(_id) : await getCategoris();
    console.log(result);
    res.jsonp({
      status: "success",
      message: " Here are the Category list",
      result,
    });
    console.log(result);
  } catch (error) {
    next(error);
  }
});

export default router;
