import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    email: {
      type: String,

      unique: true,
      required: true,

      index: 1,
    },

    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      defualt: "",
    },
    refreshJWT: {
      type: String,
      defualt: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema); // create adimin table
