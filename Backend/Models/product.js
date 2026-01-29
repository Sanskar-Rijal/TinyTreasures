import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      trim: true,
      maxLength: [
        200,
        "A product name must have less or equal then 200 characters",
      ],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, "A product must have a description"],
      trim: true,
      maxLength: [
        1000,
        "A product description must have less or equal then 1000 characters ",
      ],
    },
    ratingsAverage: {
      //this is the average rating
      type: Number,
      default: 0.0,
    },
    ratingsQuantity: {
      //this is the no of ratings
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          required: [true, "Image public_id is required"],
          type: String,
        },
        url: {
          required: [true, "Image url is required"],
          type: String,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter product category"],
      //enum only works for strings
      enum: {
        values: [
          "Electronics",
          "Cameras",
          "Laptops",
          "Accessories",
          "Headphones",
          "Food",
          "Books",
          "Clothes/Shoes",
          "Beauty/Health",
          "Sports",
          "Outdoor",
          "Home",
        ],
        message: "Please select correct category for product",
      },
    },
    seller: {
      type: String,
      required: [true, "Please enter product seller"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
    },
    //which user have created the product?
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Product must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

productSchema.index({ price: 1, ratingsAverage: -1 }); //1 means ascending order and -1 means descending order

//virtual populate for reviews
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id", //field in the current model that should match the foreign field
});

const Product = mongoose.model("Product", productSchema);
export default Product;
