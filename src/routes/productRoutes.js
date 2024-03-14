const express = require("express");
const productController = require("../controllers/productController");
const multer = require("multer"); // Import multer for handling multipart/form-data

const upload = multer();
const router = express.Router();

router.get("/get", productController.getProducts);
router.post("/post", upload.none(), productController.addProduct);
router.put("/put/:id", upload.none(), productController.updateProduct);
router.delete("/delete/:id", upload.none(), productController.deleteProduct);

module.exports = router;
