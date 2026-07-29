const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getDashboardSummary,
    getRecentOrders,
    getTopProducts
} = require("../controllers/dashboardController");

router.get("/summary", protect, getDashboardSummary);

router.get("/recent-orders", protect, getRecentOrders);

router.get("/top-products", protect, getTopProducts);

module.exports = router;