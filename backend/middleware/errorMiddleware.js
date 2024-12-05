// notFound Middleware
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404; // Set the statusCode on the error object
  next(error); // Pass the error to the next middleware (error handler)
};

// errorHandler Middleware
const errorHandler = (err, req, res, next) => {
  // Default to 500 if the statusCode is not set on the error object
  const statusCode = err.statusCode || 500;
  res.status(statusCode); // Set the response status code
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
