/* =====================================================
   NOT FOUND MIDDLEWARE
   - Handles undefined routes
===================================================== */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/* =====================================================
   ERROR HANDLER MIDDLEWARE
   - Catches all errors
===================================================== */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    // Only show stack trace in development
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
