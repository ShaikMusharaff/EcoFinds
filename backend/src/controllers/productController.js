const Product = require("../models/Product");

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

exports.getSingleProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        res.json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};