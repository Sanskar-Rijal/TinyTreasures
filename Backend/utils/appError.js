class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
    //user creating product without entering required fields is called opeational error
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor); //it will create a stack and trace where the error is
  }
}

export default AppError;
