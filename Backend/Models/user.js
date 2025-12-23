import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [30, "A user name must have less or equal then 30 characters"],
    required: [true, "A user must have a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    validate: [validator.isEmail, "Please enter a valid email address"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minLength: [8, "A user password must have more or equal then 8 characters"],
    trim: true,
    select: false, //it won't show up in any routes
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
