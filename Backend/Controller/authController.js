import jwt from "jsonwebtoken";
import util from "util";
import crypto from "crypto";
import User from "../Models/user.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Email from "../utils/email.js";

//putting information in jwt payload
const signToken = (userid) =>
  jwt.sign({ id: userid }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

//Sending Jwt token via cookie
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.cookie("token", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, //it will not allow the cookie to be accessed or modified by the browser
    secure: process.env.NODE_ENV === "production", //only HTTPS in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", //required for cross-origin
  });

  //we don't want to send password back to the client so
  user.password = undefined;

  res.status(statusCode).json({
    status: "true",
    message: {
      user,
    },
  });
};

//for signup
const signup = catchAsync(async (req, res, next) => {
  //we are creating user with all the data that is comming from the body
  //so any one can specify the role as admin , so we have to fix it,
  //manually put it in the create method
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  //send welcome email to the user
  const url = `${req.protocol}://${req.get("host")}/login`;
  //await new Email(newUser, url).sendWelcome();
  createSendToken(newUser, 201, res);
});

//for login
const login = catchAsync(async (req, res, next) => {
  //1)does email and password exists?
  //2)if yes, Is it correct?
  //3)if correct, send token to the client
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 404));
  }

  //we have wrote
  //select:false in password right? so it won't come by default, so we have to explicitly show it using .select
  const user = await User.findOne({ email: email }).select("+password"); //it will give the first document that matches the email

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  //now if we reached here then every thing till now is fine, send the token
  createSendToken(user, 200, res);
});

//Protect routes from unauthorized users
const protect = catchAsync(async (req, res, next) => {
  //1)Getting token and check if it's there
  const { token } = req.cookies;
  //console.log(token);
  //hello
  if (!token) {
    return next(
      new AppError("You are not logged in! Please login to ge access", 401)
    );
  }
  //2)Verification of token
  const verifyToken = util.promisify(jwt.verify);
  //)Now verifyToken is an async function that returns a Promise instead of using a callback.
  const decoded = await verifyToken(token, process.env.JWT_SECRET);
  //console.log(decoded); //it is an object with { id: '68dc7f7286e960220f83f281', iat: 1759281432, exp: 1769649432 }

  //3)Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists", 401)
    );
  }

  //4)Check if user recently changed their password,if yes then logout them
  const checkForPasswordChange = currentUser.changedPasswordAfter(decoded.iat);
  if (checkForPasswordChange) {
    return next(
      new AppError("User recently changed password! Please login again", 401)
    );
  }

  //5)Grant Access to protected route
  //store details of user in req.user so that other middlewares or controllers can access it
  req.user = currentUser;
  next();
});

//Logout User
const logout = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});

//role based authentication for routes,
//we have to pass argument to the middleware in this case. i.e role
//we create a wrapper function,which will return a middleware function that we want to create
const restrictTo =
  (...roles) =>
  (req, res, next) => {
    //roles is an array ["admin","lead-guide"]
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };

//Logic for Update password
const updatePassword = catchAsync(async (req, res, next) => {
  //1)Read the user from the JWT token
  const userid = req.user.id;
  //we had set select:false for password in user model so we have to explicitly select it
  const user = await User.findById(userid).select("+password");
  //2)Check if posted and current password is correct
  const valid = await user.correctPassword(
    req.body.currentPassword,
    user.password
  );
  //if not valid then throw error
  if (!valid) {
    return next(new AppError("Current password is incorrect", 401));
  }

  //3)If reached here, everything is fine, so simply update the password
  user.password = req.body.newPassword;
  console.log(user.password);

  //we have to user user.save() here instead of findByIdAndUpdate because
  //findByIdAndUpdate doesn't run the pre save middleware in usermodel
  await user.save();
  //4)Log the user in, send JWT
  createSendToken(user, 200, res);
});

//Logic for forget password
//1)make a route to get user email, and check whether the email exists or note
//2)If exists, generate a random reset token hash it and save it in the databas and send the plain token to the user.
//3)When user send the token back to the reset password route, hash the token and compare it with the stored token in the database
const forgotPassword = catchAsync(async (req, res, next) => {
  //1)Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with that email address", 404));
  }
  //2)Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false }); //we are disabling validator so that we can save the reset token and expirytime without required fields

  //3)Send it to user's email
  const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;

  try {
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      token: resetToken,
      message: "Token sent to email! Have a look sweetheart :)",
    });
  } catch (err) {
    //if SendEmail fails then we have to reset the fields that we set before
    //we reset passwordResetExpires and passwordResetToken to undefined
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    //this only modifies the data , doesn't save it to the database
    //so we have to save it
    await user.save({ validateBeforeSave: false });

    console.log(err);

    return next(
      new AppError(
        "There was an error sending the email, Try again later!",
        500
      )
    );
  }
});

//finally reset the password with the help of token
const resetPassword = catchAsync(async (req, res, next) => {
  //1)Get user based on the token
  //we get the token , hash it again and compare with the token in the database
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //now we have to find the user based on this token and also check whether the token is expired or not
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }, //token expiry time should be greate than current time
  });

  // if (!user || user.passwordResetExpires < Date.now()) { we can do this also but i did in findone
  // }
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  //2)If the token is not expired and there is user, set the new password
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({
    status: "true",
    message: "Password changed successfully",
  });
});

export {
  signup,
  login,
  protect,
  logout,
  restrictTo,
  updatePassword,
  forgotPassword,
  resetPassword,
};
