const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getDashboardSummary = async (req, res) => {
    try {

        // Seller Products
        const products = await Product.find({
            seller: req.user._id
        });

        const productIds = products.map(product => product._id);

        // Seller Orders
        const orders = await Order.find({
            "products.product": {
                $in: productIds
            }
        });

        // Statistics
        const totalProducts = products.length;

        const totalOrders = orders.length;

        let pendingOrders = 0;
        let shippedOrders = 0;
        let deliveredOrders = 0;

        let totalRevenue = 0;

        let totalRating = 0;
        let ratedProducts = 0;

        // Count order statistics
        orders.forEach(order => {

            if (order.deliveryStatus === "processing")
                pendingOrders++;

            if (order.deliveryStatus === "shipped")
                shippedOrders++;

            if (order.deliveryStatus === "delivered")
                deliveredOrders++;

            // Revenue only from seller's products
            order.products.forEach(item => {

                if (productIds.some(id => id.toString() === item.product.toString())) {

                    totalRevenue += item.price * item.quantity;

                }

            });

        });

        // Average Rating
        products.forEach(product => {

            if (product.numReviews > 0) {

                totalRating += product.averageRating;
                ratedProducts++;

            }

        });

        const averageRating =
            ratedProducts > 0
                ? Number((totalRating / ratedProducts).toFixed(1))
                : 0;

        res.status(200).json({
            success: true,
            totalProducts,
            totalOrders,
            pendingOrders,
            shippedOrders,
            deliveredOrders,
            totalRevenue,
            averageRating
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

//recent orders

exports.getRecentOrders = async (req, res) => {
    try {

        const products = await Product.find({
            seller: req.user._id
        });

        const productIds = products.map(product => product._id);

        const orders = await Order.find({
            "products.product": {
                $in: productIds
            }
        })
        .populate("user", "displayName email")
        .populate("products.product")
        .sort({ createdAt: -1 })
        .limit(5);

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

//Top products
exports.getTopProducts = async (req, res) => {
    try {

        const products = await Product.find({
            seller: req.user._id
        })
        .sort({
            averageRating: -1,
            numReviews: -1
        })
        .limit(5);

        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};