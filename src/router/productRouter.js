import express from "express";
import {
  getOneProductById,
  getProductByCatagory,
  getProducts,
} from "../model/productModel.js";

const router = express.Router();
router.get("/:id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    console.log(req.params);
    const products = _id ? await getOneProductById(_id) : await getProducts();
    products.length
      ? res.json({
          status: "success",
          message: "Here are the products",
          products,
        })
      : res.json({
          status: "error",
          message: "no products found",
        });
  } catch (error) {
    next(error);
  }
});

router.get("/category/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const product = await getProductByCatagory(_id);
    res.json({
      status: "success",
      message: " Here are the proudct related to this category",
      product,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
