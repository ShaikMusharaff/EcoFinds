const express = require("express");
const Purchase = require("../models/Purchase");
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");
const router = express.Router();

// Checkout - move cart -> purchase
router.post("/checkout", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart || !cart.products.length) return res.status(400).json({ msg: "Cart empty" });

    const purchase = new Purchase({ userId: req.userId, products: cart.products });
    await purchase.save();

    cart.products = [];
    await cart.save();

    res.json(purchase);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get purchases for user
router.get("/", auth, async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.userId }).populate("products");
    res.json(purchases);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;