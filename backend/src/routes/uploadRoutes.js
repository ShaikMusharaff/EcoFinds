const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");
const { uploadImage } = require("../controllers/uploadController");
const protect = require("../middleware/authMiddleware");

// Upload a single image
router.post("/", protect, upload.single("image"), uploadImage);

module.exports = router;