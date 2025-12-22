import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    //which user have wrote the review?
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    //review is of which product?
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    rating: {
      type: Number,
      min: [1, "Rating must be atleast 1.0"],
      max: [5, "Rating must be atmost 5.0"],
    },
    comment: {
      type: String,
      required: [true, "Please enter your review"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
