const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    checkout,
    getMyOrders,
    getOrderById,
    getSellerOrders,
    updateOrderStatus
} = require("../controllers/orderController");

router.post("/checkout", protect, checkout);

router.get("/seller", protect, getSellerOrders);

router.get("/", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

router.put("/:id/status", protect, updateOrderStatus);
module.exports = router;