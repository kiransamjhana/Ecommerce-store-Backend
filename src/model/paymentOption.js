import mongoose from "mongoose";
const paymentOptions = mongoose.model("payments", {});

export const getPayementOpton = (_id) => {
  return paymentOptions.findOne(_id);
};

export const getAllPymentOption = () => {
  return paymentOptions.find();
};
