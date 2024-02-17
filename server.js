import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import productRouter from "./src/router/productRouter.js";
import catagoryRouter from "./src/router/categoryRouter.js";
import paymentRouter from "./src/router/paymentOption.js";
import userRouter from "./src/router/userRouter.js";
import stripeRouter from "./src/router/stripeRouter.js";
import orderRouter from "./src/router/orderRouter.js";

import connectMongoDB from "./src/config/mongoconfig.js";
import { auth } from "./src/middleaware/authMiddleware.js";

connectMongoDB();

const PORT = process.env.PORT || 8200;
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//apis
app.use("/api/v1/store/product", productRouter);
app.use("/api/v1/store/catagory", catagoryRouter);
app.use("/api/v1/store/payment", paymentRouter);
app.use("/api/v1/store/user", userRouter);
app.use("/api/v1/store/payment-intent", stripeRouter);
app.use("/api/v1/store/order", orderRouter);

app.get("/", (req, res) => {
  res.json({
    status: "sucess",
    message: "thank you very much yo9ur sever is very fast",
  });
});

app.use((error, req, res, next) => {
  console.log(error);
  const code = error.statusCode || 500;
  res.status(code).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`your server is running at http://localhost:${PORT}`);
});
