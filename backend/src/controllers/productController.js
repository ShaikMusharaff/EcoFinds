const Product = require("../models/Product");


// CREATE PRODUCT
exports.createProduct = async (req, res) => {

    try {

        const product = await Product.create({
            ...req.body,
            seller: req.user?._id
        });

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {

    try {

        const products = await Product.find()
        .populate("seller", "displayName");

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// GET SINGLE PRODUCT
exports.getSingleProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id)
        .populate("seller", "displayName");

        res.json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {

    try {

        const product =
        await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });
        }

        // OWNER CHECK
        if (
            product.seller.toString() !==
            req.user._id.toString()
        ) {

            return res.status(403).json({
                message: "Not authorized"
            });
        }

        const updatedProduct =
        await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        res.json(updatedProduct);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};



// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {

    try {

        const product =
        await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });
        }

        // OWNER CHECK
        if (
            product.seller.toString() !==
            req.user._id.toString()
        ) {

            return res.status(403).json({
                message: "Not authorized"
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};