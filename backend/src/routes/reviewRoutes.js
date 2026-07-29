const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview
} = require("../controllers/reviewController");

router.post("/:productId", protect, addReview);

router.get("/:productId", getProductReviews);

router.put("/:reviewId", protect, updateReview);

router.delete("/:reviewId", protect, deleteReview);

module.exports = router;