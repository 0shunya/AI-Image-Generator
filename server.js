const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware to parse JSON body
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("AI image generator backend is running 🚀");
});

// Generate Image Route
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log("Received Prompt:", prompt);

    // Validate prompt
    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Valid prompt is required (min 3 characters)"
      });
    }

    // Check API key exists
    if (!process.env.CLIPDROP_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "API key not found. Check your .env file"
      });
    }

    // Call Clipdrop API
    const response = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      { prompt: prompt },
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer" // IMPORTANT for image data
      }
    );

    // Convert binary image to base64
    const base64Image = Buffer.from(response.data).toString("base64");

    // Send image back to frontend
    res.json({
      success: true,
      image: `data:image/png;base64,${base64Image}`
    });

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: error.response?.data || error.message || "Image generation failed"
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});