const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");

dotenv.config();

require("./config/passport");

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", require("./routes/authRoutes"));
app.get("/", (req, res) => {
    res.send("EcoFinds API Running");
});
app.use("/api/products", require("./routes/productRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:");
    console.log(error);
  });