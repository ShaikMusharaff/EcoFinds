const express = require("express");
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");
const router = express.Router();

// Add product to cart
router.post("/add", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) cart = new Cart({ userId: req.userId, products: [productId] });
    else cart.products.push(productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get user's cart
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate("products");
    res.json(cart || { products: [] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Remove a product from cart
router.delete("/remove/:productId", auth, async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.userId }, { $pull: { products: req.params.productId } }, { new: true });
    const cart = await Cart.findOne({ userId: req.userId }).populate("products");
    res.json(cart || { products: [] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
