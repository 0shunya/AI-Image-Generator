const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const imageRoutes = require("./routes/imageRoutes.js");

const app = express();

// Connect DB
connectDB();

app.use(cors({
  origin: [
    "https://ai-image-generator-jbo2.vercel.app",
    "https://ai-image-generator-jbo2-git-master-eights-projects-e676a7de.vercel.app",
    "https://ai-image-generator-git-master-eights-projects-e676a7de.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/image", imageRoutes);

// ❌ REMOVE app.listen()
// ✅ EXPORT instead
module.exports = app;

// Start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });