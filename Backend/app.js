import express from "express";
import morgan from "morgan";
import productRouter from "./Routes/productRoute.js";

const app = express();
app.use(express.json());

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

//our routes
app.use("/api/v1/products", productRouter);

// module.exports = app;
// export default app;
export { app };
