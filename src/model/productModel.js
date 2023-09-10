import mongoose from "mongoose";
const product = mongoose.model("products", {});
export const getProducts = () => {
  return product.find();
};
export const getOneProductById = (_id) => {
  return product.findById(_id);
};
export const getProductByCatagory = (filter) => {
  const _id = new mongoose.Types.ObjectId(filter);
  return product.find({ parentCat: _id });
};

export const getsingleProduct = (filter) => {
  return product.find(filter);
};
