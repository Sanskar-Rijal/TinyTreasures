import Product from "../Models/product.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";

//get all products
const getProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination();
  const products = await features.query;
  const filteredProductsCount = products.length;

  if (!products) {
    return next(new AppError("No product found !!", 404));
  }

  res.status(200).json({
    status: "true",
    message: {
      filteredProductsCount,
      products,
    },
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "true",
    message: "Products fetched successfully",
  });
});

//create new Products
const createNewProduct = catchAsync(async (req, res, next) => {
  // req.body = JSON.parse(req.body);
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: "true",
    messaeg: newProduct,
  });
});

//find products by id
const getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "true",
    message: product,
  });
});

//update product by id
const updateProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "true",
    message: product,
  });
});

//delete Product by id
const deleteProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findOneAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }
  res.status(204).json({
    status: "true",
    message: "Deleted Successfully",
  });
});

export {
  getProducts,
  deleteProduct,
  createNewProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
