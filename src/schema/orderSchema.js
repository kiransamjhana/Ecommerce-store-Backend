import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema(
  {
    payStatus: {
      type: String,
      required: true,
    },

    orderStatus: {
      type: String,
      default: "received",
    },
    userId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: String,
        },
      },
    ],
    phone: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
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

export default mongoose.model("Order", orderSchema);
