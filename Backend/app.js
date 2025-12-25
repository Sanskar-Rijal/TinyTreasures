import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRouter from "./Routes/productRoute.js";
import globalErrorHandler from "./Controller/errorController.js";
import AppError from "./utils/appError.js";
import userRouter from "./Routes/userRoute.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.set("query parser", "extended");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use((req, res, next) => {
    console.log("Hello from the middleware");
    next();
  });

  app.get("/", (req, res) => {
    res.json({
      message: "Welcome to the E-Commerce Backend",
    });
  });
}

//first midddleware
//cereating our middle ware to get data form body without req.body
// app.use((req, res, next) => {
//   let rawData = "";
//   req.on("data", (chunk) => {
//     console.log("Receiving data in chunks...", chunk);
//     rawData += chunk;
//   });
//   req.on("end", () => {
//     //console.log("All data received", rawData.toString("utf-8"));
//     req.body = rawData;
//     next();
//   });
// });

//our routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

//if No route matches, catch all undefined routes (404 handler)
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!!!`, 404));
});

//making error handling middleware which can be used anywhere in the app
app.use(globalErrorHandler);

export default app;
