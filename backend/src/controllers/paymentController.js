const crypto = require("crypto");
const razorpay = require("../utils/razorpay");

const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

// =====================================
// Create Razorpay Order
// =====================================

exports.createPaymentOrder = async (req, res) => {
    try {

        const cart = await Cart.findOne({
            user: req.user._id
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        const amount = cart.totalPrice * 100;

        const options = {
            amount,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            order: razorpayOrder
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// =====================================
// Verify Payment
// =====================================

exports.verifyPayment = async (req, res) => {

    try {

        const {

            razorpay_order_id,

            razorpay_payment_id,

            razorpay_signature

        } = req.body;

        // Verify Signature
        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                razorpay_order_id + "|" + razorpay_payment_id
            )
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {

            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });

        }

        // Prevent Duplicate Payment Verification
        const existingOrder = await Order.findOne({
            razorpayPaymentId: razorpay_payment_id
        });

        if (existingOrder) {

            return res.status(400).json({
                success: false,
                message: "Payment already verified"
            });

        }

        // Fetch Cart
        const cart = await Cart.findOne({
            user: req.user._id
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Cart is empty"
            });

        }

        // Check Stock Availability
        for (const item of cart.items) {

            if (item.product.quantity < item.quantity) {

                return res.status(400).json({
                    success: false,
                    message: `${item.product.title} is out of stock`
                });

            }

        }

        // Prepare Order Products
        const products = cart.items.map(item => ({

            product: item.product._id,

            quantity: item.quantity,

            price: item.product.price

        }));

        // Create Order
        const order = await Order.create({

            user: req.user._id,

            products,

            totalAmount: cart.totalPrice,

            paymentStatus: "completed",

            paymentMethod: "Razorpay",

            razorpayOrderId: razorpay_order_id,

            razorpayPaymentId: razorpay_payment_id,

            deliveryStatus: "processing"

        });

        // Reduce Stock
        for (const item of cart.items) {

            await Product.findByIdAndUpdate(
                item.product._id,
                {
                    $inc: {
                        quantity: -item.quantity
                    }
                }
            );

        }

        // Clear Cart
        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();

        res.status(200).json({

            success: true,

            message: "Payment verified successfully",

            order

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};