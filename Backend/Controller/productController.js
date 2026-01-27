import multer from "multer";
import sharp from "sharp";
import Product from "../Models/product.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";
import cloudinary, { deleteCloudinaryImages } from "../utils/cloudinary.js";

//for adding product images
//1) Store file in memory temporarily
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//2) Creating middleware to upload product images
const uploadProductImages = upload.array("images", 4);

//3) Resize and upload product images to cloudinary
const resizeProductImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  //images
  //our images is an empty array so we will have to create it first
  req.body.images = [];
  await Promise.all(
    req.files.map(async (file, index) => {
      //4) Resiize the images using sharp
      const buffer = await sharp(file.buffer)
        .resize(2000, 1333, {
          fit: sharp.fit.cover,
          position: sharp.strategy.entropy,
        })
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toBuffer();

      //5) now we will upload the image to cloudinary one by one
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "TinyTreasures/products",
            public_id: `product-${req.user.id}-${Date.now()}-${index + 1}`,
            resource_type: "image",
          },
          (error, answer) => {
            if (error) reject(error);
            resolve(answer);
          },
        );
        stream.end(buffer);
      });
      //6) we wills store the url and public_id in req.body.images array
      req.body.images.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }),
  );
  next();
});

//get all products
const getallProducts = catchAsync(async (req, res, next) => {
  //count the length of total products
  const countProducts = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  const totalProducts = await countProducts.query;

  const features = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination();
  const products = await features.query;
  const filteredProductsCount = totalProducts.length;

  if (products.length === 0) {
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

  //getting user id from protect middleware
  req.body.user = req.user._id;

  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: "true",
      message: newProduct,
    });
  } catch (error) {
    // if some error occurs while creating product, delete the uploaded images
    if (req.body.images && req.body.images.length > 0) {
      await deleteCloudinaryImages(req.body.images);
    }
    //Re-throwing the error so that our global error handler will handle it
    throw error;
  }
});

//find products by id
const getProductById = catchAsync(async (req, res, next) => {
  //using populate to show reviews of that product
  const product = await Product.findById(req.params.id).populate({
    path: "reviews",
    select: "-__v",
  });

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
  getallProducts,
  uploadProductImages,
  resizeProductImages,
  deleteProduct,
  createNewProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
