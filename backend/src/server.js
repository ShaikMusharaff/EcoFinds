const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const passport = require("passport");

require("./config/passport");

dotenv.config();

const app = express();


// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());

app.use(passport.initialize());


// ================= ROUTES =================

app.use("/api/auth", require("./routes/authRoutes"));


// ================= DATABASE CONNECTION =================

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {

        console.log(
            `Server running on port ${process.env.PORT}`
        );

    });

})

.catch((error) => {

    console.log(error);

});