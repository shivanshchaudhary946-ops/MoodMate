const axios = require("axios");

const getGeminiResponse = async (userMessage) => {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [
            {
              text: `You are a calm, empathetic mental wellness assistant. Respond supportively and briefly to the following message: "${userMessage}"`,
            },
          ],
        },
      ],
    }
  );

  return response.data.candidates[0].content.parts[0].text;
};

module.exports = { getGeminiResponse };