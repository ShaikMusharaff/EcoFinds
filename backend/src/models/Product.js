const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    title: String,

    category: String,

    description: String,

    price: Number,

    quantity: Number,

    condition: String,

    yearOfManufacture: Number,

    brand: String,

    model: String,

    dimensions: String,

    weight: String,

    material: String,

    color: String,

    originalPackaging: Boolean,

    manualIncluded: Boolean,

    workingCondition: String,

    images: [String]
},
{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);