import mongoose from "mongoose";
const catagory = mongoose.model("categories", {});

export const getCategoris = () => {
  return catagory.find();
};

export const getCategoryById = (_id) => {
  return catagory.findOne(_id);
};
