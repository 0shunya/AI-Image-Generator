const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { generateImage } = require("../controllers/imageController");

router.post("/generate", authMiddleware, generateImage);

module.exports = router;