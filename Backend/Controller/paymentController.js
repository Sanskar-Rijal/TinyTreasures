import axios from "axios";
import Order from "../Models/order.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const initiateKhaltiPayment = catchAsync(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  //create order with status pending
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user.id,
    paymentInfo: {
      status: "Pending",
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), //Order will delete automatically if user does not pay within 15 minutes
    },
  });

  try {
    const response = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      {
        return_url: "http://localhost:5173/payment-success",
        website_url: "http://localhost:5173",
        amount: totalPrice * 100, //Convert into paisa
        purchase_order_id: order._id.toString(),
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
    // console.log(error.response.data);
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

const verifyKhaltiPayment = catchAsync(async (req, res, next) => {
  const { pidx, orderId } = req.body;
  //now we send pidx back to khalti to verify our payment
  const response = await axios.post(
    "https://dev.khalti.com/api/v2/epayment/lookup/",
    {
      pidx: pidx,
    },
    {
      headers: {
        Authorization: `Key ${process.env.KHALTI_LIVE_SECRET_KEY}`,
      },
    },
  );

  //check status whether payment is successful or not
  if (response.data.status !== "Completed") {
    throw new AppError("Khalti payment verification failed", 400);
  }

  //lets update the status to success now
  await Order.findByIdAndUpdate(orderId, {
    paymentInfo: {
      id: response.data.transaction_id,
      status: response.data.status,
      expiresAt: null, //cancel the expiry as payment is done
    },
  });

  //if we reached here means payment is successful
  res.status(200).json({
    status: "true",
    message: "Order payment verified successfully",
  });
});

export { initiateKhaltiPayment, verifyKhaltiPayment };
