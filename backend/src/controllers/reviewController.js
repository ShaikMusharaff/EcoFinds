const Review = require("../models/Review");
const Product = require("../models/Product");
const Order = require("../models/Order");

// Add Review
exports.addReview = async (req, res) => {
    try {

        const { rating, comment } = req.body;
        const { productId } = req.params;

        // Check if product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Check if user has purchased the product
        const hasPurchased = await Order.findOne({
            user: req.user._id,
            "products.product": productId
        });

        if (!hasPurchased) {
            return res.status(403).json({
                message: "You can only review products you have purchased"
            });
        }

        // Check if review already exists
        const existingReview = await Review.findOne({
            user: req.user._id,
            product: productId
        });

        if (existingReview) {
            return res.status(400).json({
                message: "You have already reviewed this product"
            });
        }

// Create review
const review = await Review.create({
    user: req.user._id,
    product: productId,
    rating,
    comment
});

// Update product rating
await updateProductRating(productId);

res.status(201).json({
    message: "Review added successfully",
    review
});

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get Reviews for a Product
exports.getProductReviews = async (req, res) => {
    try {

        const reviews = await Review.find({
            product: req.params.productId
        })
        .populate("user", "name")
        .sort({ createdAt: -1 });

        res.status(200).json(reviews);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Update Review
exports.updateReview = async (req, res) => {
    try {

        const { rating, comment } = req.body;

        const review = await Review.findById(req.params.reviewId);

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        review.rating = rating;
        review.comment = comment;

        await review.save();
        await updateProductRating(review.product);
        res.status(200).json({
            message: "Review updated successfully",
            review
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Delete Review
exports.deleteReview = async (req, res) => {
    try {

        const review = await Review.findById(req.params.reviewId);

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

const productId = review.product;

await review.deleteOne();

// Update product rating
await updateProductRating(productId);

res.status(200).json({
    message: "Review deleted successfully"
});

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Update Product Rating
const updateProductRating = async (productId) => {

    const reviews = await Review.find({ product: productId });

    const numReviews = reviews.length;

    let averageRating = 0;

    if (numReviews > 0) {
        const totalRating = reviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );

        averageRating = totalRating / numReviews;
    }

    await Product.findByIdAndUpdate(productId, {
        averageRating,
        numReviews
    });

};