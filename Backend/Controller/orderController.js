import Order from "../Models/order.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Product from "../Models/product.js";

//Create a new order
const createOrder = catchAsync(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user.id,
  });
  if (!order) {
    return next(new AppError("Order creation failed", 400));
  }

  res.status(201).json({
    success: true,
    message: order,
  });
});

//Get a single order
const getSingleOrder = catchAsync(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (!order) {
    return next(new AppError("No order found with this id", 404));
  }
  res.status(200).json({
    success: "true",
    message: order,
  });
});

//get all orders of loggedin  user
const getmyOrder = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
  res.status(200).json({
    success: "true",
    message: orders,
  });
});

//Get all orders of all users -- ADMIN
const getAllOrdersAdmin = catchAsync(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({
    success: "true",
    message: orders,
  });
});

//Update order status -- ADMIN
const updateOrderStatusAdmin = catchAsync(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (!order) {
    return next(new AppError("No order found with this id", 404));
  }
  if (order?.orderStatus === "Delivered") {
    return next(new AppError("You have already delivered this order", 400));
  }

  //now during shipping  we have to reduce the stock for the products
  order.orderItems.forEach(async (item) => {
    const product = await Product.findById(item.product);
    if (!product) {
      return next(new AppError("No product found with this id", 404));
    }
    product.stock -= item.quantity;
    //now save the product
    await product.save({ validateBeforeSave: false });
  });
  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();
  //saving the order
  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: "true",
    message: "Order status updated successfully",
  });
});

//Delete order -- ADMIN
const deleteOrderAdmin = catchAsync(async (req, res, next) => {
  const orderId = req.params.id;
  if (!orderId) {
    return next(new AppError("Please provide order id first", 400));
  }
  await Order.findByIdAndDelete(orderId);
  res.status(204).json({
    success: "true",
    message: "Order deleted successfully",
  });
});

export {
  createOrder,
  getSingleOrder,
  getmyOrder,
  getAllOrdersAdmin,
  updateOrderStatusAdmin,
  deleteOrderAdmin,
};
