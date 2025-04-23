// notFoundHandler.js
exports.notFoundHandler = (req, res, next) => {
  res.status(404).json({
    status: false,
    message: "The requested resource was not found on this server.",
    data: null,
  });
};
