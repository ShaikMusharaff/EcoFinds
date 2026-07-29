const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.checkout = async (req, res) => {
    try {

        const cart = await Cart.findOne({
            user: req.user._id
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        const orderProducts = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        }));

        const order = await Order.create({
            user: req.user._id,
            products: orderProducts,
            totalAmount: cart.totalPrice
        });

        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get all orders for a user
exports.getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            user: req.user._id
        })
        .populate("products.product")
        .sort({ createdAt: -1 });

        res.status(200).json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

//order by id
exports.getOrderById = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id)
            .populate("products.product");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        res.status(200).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get all orders for a seller
exports.getSellerOrders = async (req, res) => {
    try {

       const orders = await Order.find()
    .populate("user", "name email")
    .populate("products.product")
    .sort({ createdAt: -1 });

        const sellerOrders = [];

        for (const order of orders) {

            const sellerProducts = order.products.filter(item =>
                item.product &&
                item.product.seller.toString() === req.user._id.toString()
            );

            if (sellerProducts.length > 0) {
                sellerOrders.push({
                    _id: order._id,
                    buyer: order.user,
                    products: sellerProducts,
                    totalAmount: order.totalAmount,
                    paymentStatus: order.paymentStatus,
                    deliveryStatus: order.deliveryStatus,
                    createdAt: order.createdAt
                });
            }
        }

        res.status(200).json(sellerOrders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Update order status (for sellers)
exports.updateOrderStatus = async (req, res) => {
    try {

        const { deliveryStatus } = req.body;

        const order = await Order.findById(req.params.id)
            .populate("products.product");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        // ✅ Validate the status here
        const allowedStatus = ["processing", "shipped", "delivered"];

        if (!allowedStatus.includes(deliveryStatus)) {
            return res.status(400).json({
                message: "Invalid delivery status"
            });
        }

        const isSeller = order.products.some(item =>
            item.product &&
            item.product.seller.toString() === req.user._id.toString()
        );

        if (!isSeller) {
            return res.status(403).json({
                message: "You are not authorized to update this order."
            });
        }
if (order.deliveryStatus === deliveryStatus) {
    return res.status(400).json({
        message: "Order is already in this status"
    });
}

order.deliveryStatus = deliveryStatus;

await order.save();

res.status(200).json({
    message: "Order status updated successfully",
    order
});

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};