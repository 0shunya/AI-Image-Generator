const express = require("express");
const axios = require("axios");
require("dotenv").config();
const FormData = require("form-data");
const mongoose = require("mongoose")

const app = express();
const PORT = 5000;

// Middleware to parse JSON body
app.use(express.json());

mongoose.connect(process.env.mongoose.MONGO_URI)
  .then(()=> console.log("MongoDB Connected"))
  .catch(err => console.error("Mongo Error: ", err));

// Root Route
app.get("/", (req, res) => {
  res.send("AI image generator backend is running 🚀");
});

// Generate Image Route
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Valid prompt is required"
      });
    }

    const FormData = require("form-data");
    const form = new FormData();
    form.append("prompt", prompt);

    const response = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      form,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
          ...form.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(response.data).toString("base64");

    res.json({
      success: true,
      image: `data:image/png;base64,${base64Image}`
    });

  } catch (error) {
    let errorMessage = "Image generation failed";

    if (error.response?.data) {
      errorMessage = Buffer.from(error.response.data).toString("utf-8");
    }

    console.error("REAL ERROR:", errorMessage);

    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});