const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const uploadRoutes = require("./routes/uploadRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
require("./config/passport");

const app = express();


// ================= MIDDLEWARE =================

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

app.use(passport.initialize());


// ================= ROUTES =================

app.use("/api/auth", require("./routes/authRoutes"));
 app.use("/api/products", require("./routes/productRoutes"));
 app.use("/api/upload", uploadRoutes);
 app.use("/api/cart", cartRoutes);
 app.use("/api/orders", orderRoutes);
 app.use("/api/reviews", reviewRoutes);
 app.use("/api/wishlist", wishlistRoutes);
 app.use("/api/dashboard", dashboardRoutes);
 app.use("/api/payment", paymentRoutes);
app.get("/", (req, res) => {
    
    res.send("EcoFinds API Running");
});


// ================= DATABASE =================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB Connected");

        app.listen(process.env.PORT || 5000, () => {

            console.log(
                `Server running on port ${process.env.PORT || 5000}`
            );

        });

    })
    .catch((error) => {

        console.log("MongoDB Connection Error:");
        console.log(error);

    });