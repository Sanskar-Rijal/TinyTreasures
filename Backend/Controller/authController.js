import jwt from "jsonwebtoken";
import util from "util";
import User from "../Models/user.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

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
    //  secure: true, //it will only send the cookie on https, in Production make this true
    httpOnly: true, //it will not allow the cookie to be accessed or modified by the browser
  });

  //we don't want to send password back to the client so
  user.password = undefined;

  res.status(statusCode).json({
    status: "true",
    message: {
      user,
      token: token,
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

export { signup, login, protect };
