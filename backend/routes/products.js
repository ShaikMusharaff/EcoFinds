const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const router = express.Router();

// Create product (protected)
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, category, price, imageUrl } = req.body;
    const product = new Product({ title, description, category, price, imageUrl, sellerId: req.userId });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get products (supports ?category= & ?search=)
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search) filter.title = { $regex: req.query.search, $options: "i" };

    const products = await Product.find(filter).populate("sellerId", "username");
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get product by id
router.get("/:id", async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).populate("sellerId", "username");
    if (!p) return res.status(404).json({ msg: "Product not found" });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update product (only seller)
router.put("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    if (product.sellerId.toString() !== req.userId) return res.status(403).json({ msg: "Not allowed" });

    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Delete product (only seller)
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    if (product.sellerId.toString() !== req.userId) return res.status(403).json({ msg: "Not allowed" });

    await product.remove();
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;