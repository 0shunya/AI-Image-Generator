const express = require("express");
require("dotenv").config();
const cors = require('cors');

const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const imageRoutes = require("./routes/imageRoutes.js");

const app = express();
const PORT = 5000;

// Connect Database
connectDB();

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'https://ai-image-generator-jbo2.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true
}))

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/image", imageRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});