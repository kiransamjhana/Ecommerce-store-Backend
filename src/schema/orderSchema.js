import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderStatus: {
      type: String,
      default: "pending",
    },
    paymentStatus: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      default: "",
    },
    email: {
      type: String,

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
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema); // create order table
