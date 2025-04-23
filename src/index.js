const express = require("express");
const cors = require("cors");
// const multer = require("multer");
const { errorHandler } = require("./middleware/errorHandler");
const { notFoundHandler } = require("./middleware/notFoundHandler");
const { unifiedResponse } = require("./middleware/unifiedResponseHandler");
const authRoutes = require("./routes/authRoutes");
const skillsRoutes = require("./routes/skillsRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const sequelize = require("../database");

// Initialize the Express app
const app = express();
// const upload = multer();
const port = process.env.PORT;
app.use(cors());
app.use(express.static('public'))

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Unified response middleware to provide consistent API responses
// app.use(upload.any());
// Apply multer to all routes
app.use(unifiedResponse);

// Define application routes
app.use("/api/auth", authRoutes);
app.use("/api", skillsRoutes);
app.use("/api", aboutRoutes);

// Error handling middleware for handling any errors that reach this point
app.use(errorHandler);

// Middleware to handle 404 errors for undefined routes
app.use(notFoundHandler);

// Synchronize Sequelize models with the database, creating tables if they don't exist
sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created successfully!");
  })
  .catch((err) => console.error("Error syncing database:", err));

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
