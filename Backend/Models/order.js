import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: [true, "Address field is required"],
      },
      city: {
        type: String,
        required: [true, "City field is required"],
      },
      phoneNo: {
        type: String,
        required: [true, "Phone number field is required"],
      },
      zipCode: {
        type: String,
        required: [true, "Zipcode field is required"],
      },
      country: {
        type: String,
        required: [true, "Country field is required"],
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Order must belong to a user"],
      ref: "User",
    },
    orderItems: [
      {
        name: {
          type: String,
          required: [true, "Please enter product name"],
        },
        quantity: {
          type: Number,
          required: [true, "Please enter product quantity"],
        },
        image: {
          type: String,
          required: [true, "Please enter product image"],
        },
        price: {
          type: Number,
          required: [true, "Product price is required"],
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, "Order. items must have a product"],
          ref: "Product",
        },
      },
    ],
    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
    },
    // paymentMethod: {
    //   type: String,
    //   required: [true, "Please enter payment method"],
    //   enum: {
    //     values: ["COD", "Online"],
    //     message: "Please select correct payment method",
    //   },
    // },
    itemsPrice: {
      type: Number,
      required: [true, "Please enter item Price"],
      defaule: 0.0,
    },
    taxPrice: {
      type: Number,
      required: [true, "Please enter tax price"],
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      default: 0.0,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: [true, "Please enter total price"],
      default: 0.0,
    },
    orderStatus: {
      type: String,
      default: "Processing",
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//using Query middleware to populate user
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email",
  });
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
