const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => {
    next(err); //this will go immediately to the middleware accepting error
  });
};

export default catchAsync;
