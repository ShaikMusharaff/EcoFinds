const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    displayName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String
    },

    googleId: {
        type: String
    },

    profileImage: {
        type: String,
        default: ""
    },

    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);