exports.errorHandler = (err, req, res, next) => {
  // If there's a status code on the error, use it; otherwise, default to 500
  const statusCode = err.status || 500;

  // Use the unified response format with the error message
  res.error(err.message, null, statusCode);
};
