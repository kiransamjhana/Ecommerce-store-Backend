import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
    },
    name: {
      type: String,
    },

    phone: {
      type: String,
    },
    currency: {
      type: String,
      default: "",
    },
    email: {
      type: String,

      unique: true,

      index: 1,
    },

    amount: {
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    transId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema); // create order table
