import AppError from "../utils/appError.js";

//error meessage for development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    data: err.message,
    stack: err.stack,
  });
};

//error message for production
const sendErrorProd = (err, res) => {
  //if it is operational error, send message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      data: err.message,
    });
  } else {
    //programming or other unknown error: don't leak error details
    console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      data: "Something went wrong, try again later",
    });
  }
};

//handling cast error, matlab maile id galti pathaye vane
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

//handle duplicate value error 
const handleDuplicateFieldsDB = (err)=>{
     const message = `Duplicate field value : ${err.keyValue.name}. Please use another value!!`;
  return new AppError(message, 400);
}

//handle validation error 
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((element) => element.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

//this is our global error handler middleware
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.name = err.name;
    error.message = err.message;
    error.stack = err.stack;

    //handle specific errors here

    //error no 1, cast error, occured when id is not matched
    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }

    //error no 2, duplicate field error, if a field is unique and user tries to enter same value
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }

     //error no 3 , validation error, if user enters soemthing that doesn't match the schema
    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }

    sendErrorProd(error,res);
  }
};

export default globalErrorHandler;
