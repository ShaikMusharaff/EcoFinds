const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
      type: String,
    required: true,
    trim: true  
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String,
        default: ''
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true});
module.exports = mongoose.model('Product', productSchema);