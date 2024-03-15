const { poolQuery } = require("../../database");
const {
  validateProductName,
  validateProductNotFound,
} = require("../validators/productValidator");

exports.getProducts = async (req, res, next) => {
  try {
    const rows = await poolQuery("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

exports.addProduct = [
  // Apply validation middleware
  validateProductName,
  async (req, res, next) => {
    try {
      const { name } = req.body;
      await poolQuery("INSERT INTO products (name) VALUES (?)", [name]);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
];

exports.updateProduct = [
  // Apply validation middleware
  validateProductName,
  async (req, res, next) => {
    const id = req.params.id; // Get the id from the URL parameter
    const { name } = req.body;
    try {
      // Assuming you're updating the product with the provided id
      await poolQuery("UPDATE products SET name = ? WHERE id = ?", [name, id]);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

exports.deleteProduct = [
  validateProductNotFound,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await poolQuery("DELETE FROM products WHERE id = ?", [id]);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
];
