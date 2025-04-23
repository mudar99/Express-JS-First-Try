const express = require("express");
const { authenticate } = require("../middleware/authHandler");
const upload = require("../middleware/uploadHandler"); // Import the upload middleware
const { getAbout, updateAbout } = require("../controllers/aboutController");

const router = express.Router();

// Route to get about information
router.get("/about", getAbout);

// Route to update about information with authentication and file upload
router.put("/about", authenticate, upload.single("image"), updateAbout);

module.exports = router;
