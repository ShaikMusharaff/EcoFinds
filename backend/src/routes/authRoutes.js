const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
    signup,
    login
} = require("../controllers/authController");

const generateToken = require("../utils/generateToken");


// ================= NORMAL AUTH =================

router.post("/signup", signup);

router.post("/login", login);


// ================= GOOGLE AUTH =================

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get(
    "/google/callback",

    passport.authenticate("google", {
        session: false
    }),

    (req, res) => {

        const token = generateToken(req.user._id);

        res.redirect(
            `http://localhost:5173/auth/success?token=${token}`
        );
    }
);

module.exports = router;