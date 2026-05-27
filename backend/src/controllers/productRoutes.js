const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createProduct,
    getProducts,
    getSingleProduct
} = require("../controllers/productController");

router.post("/", protect, createProduct);

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

module.exports = router;