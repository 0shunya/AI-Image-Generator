const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware.js");
const { generateImage } = require("../controllers/imageController.js");

router.post("/generate", authMiddleware, generateImage);

module.exports = router;