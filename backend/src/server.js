const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const passport = require("passport");

require("./config/passport");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(passport.initialize());

app.use("/api/auth", require("./routes/authRoutes"));