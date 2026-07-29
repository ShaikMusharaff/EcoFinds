const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const uploadRoutes = require("./routes/uploadRoutes");


require("./config/passport");

const app = express();


// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());

app.use(passport.initialize());


// ================= ROUTES =================

app.use("/api/auth", require("./routes/authRoutes"));
 app.use("/api/products", require("./routes/productRoutes"));
 app.use("/api/upload", uploadRoutes);
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