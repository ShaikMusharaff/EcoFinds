const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },

            quantity: {
                type: Number,
                required: true
            }
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },

    deliveryStatus: {
        type: String,
        enum: ["processing", "shipped", "delivered"],
        default: "processing"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Order", orderSchema);