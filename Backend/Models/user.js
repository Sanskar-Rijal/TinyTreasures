import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: [30, "A user name must have less or equal then 30 characters"],
      required: [true, "A user must have a name"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "A user must have an email"],
      validate: [validator.isEmail, "Please enter a valid email address"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "A user must have a password"],
      minLength: [
        8,
        "A user password must have more or equal then 8 characters",
      ],
      trim: true,
      select: false, //it won't show up in any routes
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
        default: "https://i.imgur.com/sm235gS.jpg",
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//using document middleware to hash the password, runs on save and create
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // if password is not modified then we don't need to hash it again
    return;
  }
  //13 is the cost parameter, higher the cost more secure but slower the hashing
  this.password = await bcrypt.hash(this.password, 13);
  //call the next middleware, in express 5 it automatically goes to next after promise is resolved
  //next();
});

//creating instance to comapre the saved hashed password with the entered password
userSchema.methods.correctPassword = async function (
  candidatePassword, //Password entered by the user
  userPassword, //hashed password stored in the database
) {
  //we cant use this.password because in the userSchema we have set select:false, so we passed it in the function
  return await bcrypt.compare(candidatePassword, userPassword);
};

//Checking if user recently changed their password after jwt was issued
//creating instance
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10, //10 means this is a base 10 number
    ); //converting to seconds

    //if this is true means password was changed after jwt was issued
    return JWTTimeStamp < changedTimestamp;
  }
  //returh false if there is noPasswordChangedAt
  return false;
};

//creating instance to generate token for forgot password
userSchema.methods.createPasswordResetToken = function () {
  //it will create a random string of 32 bytes and convert it to hex format
  const resetToken = crypto.randomBytes(32).toString("hex");
  //hashing the token and storing it in the database
  const tokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetToken = tokenHash;
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10 minutes from now
  //return the plain token to the user
  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
