// unifiedResponse.js
exports.unifiedResponse = (req, res, next) => {
  // Standardized success response with customizable status code
  res.success = (message, data = null, statusCode = 200) => {
    res.status(statusCode).json({
      status: true,
      message: message || "Request successful",
      data: data || {},
    });
  };

  // Standardized error response with customizable status code
  res.error = (message, data = null, statusCode = 500) => {
    res.status(statusCode).json({
      status: false,
      message: message || "An error occurred",
      data: data || {},
    });
  };

  next();
};
