const Product = require("../models/Product");


// Create Product
exports.createProduct = async (req, res) => {
    try {

        const product = await Product.create({
            ...req.body,
            seller: req.user._id
        });

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// Get All Products
exports.getProducts = async (req, res) => {
    try {

        const products = await Product.find()
            .populate("seller", "displayName email");

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// Get Single Product
exports.getSingleProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id)
            .populate("seller", "displayName email");

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// Update Product
exports.updateProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (product.seller.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedProduct);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// Delete Product
exports.deleteProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (product.seller.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        await product.deleteOne();

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// My Listings
exports.getMyProducts = async (req, res) => {
    try {

        const products = await Product.find({
            seller: req.user._id
        });

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};