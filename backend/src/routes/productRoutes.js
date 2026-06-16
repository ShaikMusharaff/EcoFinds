const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getMyProducts
} = require("../controllers/productController");


// Public Routes
router.get("/", getProducts);
router.get("/:id", getSingleProduct);


// Protected Routes
router.post("/", protect, createProduct);
router.get("/my/listings", protect, getMyProducts);

router.put("/:id", protect, updateProduct);

router.delete("/:id", protect, deleteProduct);

router.get("/my/listings", protect, getMyProducts);

module.exports = router;