const axios = require("axios");
const FormData = require("form-data");

exports.generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length < 3) {
      return res.status(400).json({ message: "Valid prompt required" });
    }

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
      image: `data:image/png;base64,${base64Image}`,
    });

  } catch (error) {
    let errorMessage = "Image generation failed";

    if (error.response?.data) {
      errorMessage = Buffer.from(error.response.data).toString("utf-8");
    }

    res.status(500).json({ message: errorMessage });
  }
};
