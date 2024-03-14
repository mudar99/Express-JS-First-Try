// const express = require("express");
// const mysql = require("mysql2"); // Import the mysql module
// const { pool } = require("../database");

// const app = express();
// const PORT = 3001;

// // Middleware to parse JSON and URL-encoded bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Start the server
// app.listen(PORT, () => {
//   console.log("Server is running on port", PORT);
// });

// const { poolQuery } = require("../database");

// app.get("/api/products/get", async (req, res) => {
//   try {
//     const rows = await poolQuery("SELECT * FROM products");
//     res.json(rows);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// const multer = require("multer"); // Import multer for handling multipart/form-data
// const upload = multer(); // Create a multer instance

// app.post("/api/products/post", upload.none(), async (req, res) => {
//   const { name } = req.body;
//   console.log(name);
//   try {
//     await poolQuery("INSERT INTO products (name) VALUES (?)", [name]);
//     res.sendStatus(200);
//   } catch (error) {
//     console.error("Error adding product:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.put("/api/products/put/:id", upload.none(), async (req, res) => {
//   const id = req.params.id; // Get the id from the URL parameter
//   const { name } = req.body;
//   console.log(id, name);
//   try {
//     // Assuming you're updating the product with the provided id
//     await poolQuery("UPDATE products SET name = ? WHERE id = ?", [name, id]);
//     res.sendStatus(200);
//   } catch (error) {
//     console.error("Error updating product:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.delete(`/api/products/delete/:id`, async (req, res) => {
//   const id = req.params.id; // Get the id from the URL parameter
//   try {
//     // Perform the delete operation in the database
//     await poolQuery("DELETE FROM products WHERE id = ?", [id]);
//     res.sendStatus(200); // Send a 200 OK response if the delete operation was successful
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     res.status(500).json({ error: "Internal Server Error" }); // Send a 500 Internal Server Error response if there was an error
//   }
// });

// index.js
const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const { notFoundHandler } = require("./middleware/notFoundHandler");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", productRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
