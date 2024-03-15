const { body, validationResult } = require("express-validator");
const { poolQuery } = require("../../database");

exports.validateProductName = [
  // Validation rules for product name
  body("name")
    .trim()
    .notEmpty()
    .withMessage({ msg: "Product name is required", status: false }) // Custom status code
    .isLength({ max: 255 })
    .withMessage("Product name must not exceed 255 characters"),

  // Validation middleware for product name
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const formattedError = errors.array()[0].msg;
      const response = {
        status: formattedError.status || false,
        message: formattedError.msg,
        data: null,
      };
      return res.status(400).json(response);
    }
    next();
  },
];

// Middleware to validate if the product exists before deletion
exports.validateProductNotFound = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await poolQuery("SELECT * FROM products WHERE id = ?", [id]);
    if (result.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
