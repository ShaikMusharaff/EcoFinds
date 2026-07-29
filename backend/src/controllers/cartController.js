const Cart = require("../models/Cart");
const Product = require("../models/Product");
const calculateTotal = require("../utils/cartUtils");
exports.addToCart = async (req, res) => {
    try {

        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        let cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                items: [],
                totalPrice: 0
            });
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += Number(quantity);
        } else {
            cart.items.push({
                product: productId,
                quantity: Number(quantity)
            });
        }

cart.totalPrice = 0;

for (const item of cart.items) {

    const productData = await Product.findById(item.product);

    cart.totalPrice +=
        productData.price * item.quantity;
}
        await cart.save();

        res.status(200).json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getCart = async (req, res) => {
    try {

        const cart = await Cart.findOne({
            user: req.user._id
        }).populate("items.product");

        if (!cart) {
            return res.status(404).json({
                message: "Cart is empty"
            });
        }

        res.status(200).json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

//update cart item quantity
exports.updateCart = async (req, res) => {
    try {

        const { quantity } = req.body;
        const { productId } = req.params;

        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        item.quantity = Number(quantity);

        cart.totalPrice = await calculateTotal(cart);

        await cart.save();

        res.status(200).json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

//delete cart item
exports.removeFromCart = async (req, res) => {
    try {

        const { productId } = req.params;

        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        cart.totalPrice = await calculateTotal(cart);

        await cart.save();

        res.status(200).json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

//clear cart
exports.clearCart = async (req, res) => {
    try {

        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();

        res.status(200).json({
            message: "Cart cleared successfully",
            cart
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};