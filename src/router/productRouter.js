import express, { json } from "express";
import {
  getOneProductById,
  getProductByCatagory,
  getProducts,
} from "../model/productModel.js";

const router = express.Router();
router.get("/category/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const product = await getProductByCatagory(_id);
    console.log(product);
    res.json({
      status: "success",
      message: " Here are the proudct related to this category",
      product,
    });
  } catch (error) {
    next(error);
  }
});
router.get("/:id?", async (req, res, next) => {
  try {
    console.log(req.params, "coming from params---------");
    const { id } = req.params;
    const products = id ? await getOneProductById(id) : await getProducts();
    products.length || products._id
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

router.get("/", (req, res, next) => {
  return res.json({
    status: "success",
  });
});

export default router;
