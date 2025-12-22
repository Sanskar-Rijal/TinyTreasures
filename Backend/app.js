import express from "express";
import morgan from "morgan";

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

// module.exports = app;
// export default app;
export { app };
