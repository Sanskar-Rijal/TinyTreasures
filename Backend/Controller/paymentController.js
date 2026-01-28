import axios from "axios";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const initiateKhaltiPayment = catchAsync(async (req, res, next) => {
  const { totalPrice, orderId } = req.body;
  try {
    const response = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      {
        return_url: "http://localhost:5173/payment-success",
        website_url: "http://localhost:5173",
        amount: totalPrice * 100, //Convert into paisa
        purchase_order_id: orderId,
        purchase_order_name: "TinyTreasure Order",
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_LIVE_SECRET_KEY}`,
        },
      },
    );

    res.status(200).json({
      status: "true",
      message: response.data,
    });
  } catch (error) {
    console.log(error.response.data);
    //khalti sends error messages in error.response.data
    if (error.response) {
      const errData = error.response.data;

      const message = (() => {
        if (typeof errData === "string") return errData;
        const key = Object.keys(errData).find((k) => k !== "error_key");
        return key ? errData[key][0] : "Khalti payment initiation failed";
      })();

      return next(new AppError(message, 400));
    }

    return next(new AppError(error.message, 500));
  }
});

export { initiateKhaltiPayment };
