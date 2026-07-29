const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
    clearCart
} = require("../controllers/cartController");

router.put("/update/:productId", protect, updateCart);
router.delete("/remove/:productId", protect, removeFromCart);
router.delete("/clear", protect, clearCart);
router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
module.exports = router;