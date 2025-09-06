const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercases: true
    },
    passwordHash: {
        type: String,
        required: true
    }
}, { timestamps: true});

module.exports = mongoose.model('User', userSchema)