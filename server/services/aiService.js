const axios = require("axios");

/* =====================================================
   CONFIG
===================================================== */
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = "https://api.openai.com/v1/chat/completions";

/* =====================================================
   GENERIC AI REQUEST FUNCTION
===================================================== */
const askAI = async (prompt) => {
  try {
    const response = await axios.post(
      OPENAI_BASE_URL,
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful AI assistant for a dating platform called Love Bumble.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("AI Service Error:", error.response?.data || error.message);
    throw new Error("AI service unavailable");
  }
};

/* =====================================================
   GENERATE BIO
===================================================== */
const generateBio = async (userInfo) => {
  const prompt = `
  Create a fun and engaging dating profile bio.
  Name: ${userInfo.name}
  Age: ${userInfo.age}
  Interests: ${userInfo.interests || "Not specified"}
  Keep it under 120 words.
  `;

  return await askAI(prompt);
};

/* =====================================================
   GENERATE ICEBREAKER MESSAGE
===================================================== */
const generateIcebreaker = async (senderName, receiverName, receiverBio) => {
  const prompt = `
  Create a friendly and unique first message from ${senderName}
  to ${receiverName}.
  Receiver bio: "${receiverBio}"
  Keep it short and engaging.
  `;

  return await askAI(prompt);
};

/* =====================================================
   COMPATIBILITY SCORE
===================================================== */
const calculateCompatibility = async (userA, userB) => {
  const prompt = `
  Compare these two users and give a compatibility score (0-100)
  and a short explanation.

  User A Interests: ${userA.interests}
  User B Interests: ${userB.interests}
  `;

  return await askAI(prompt);
};

/* =====================================================
   BASIC CONTENT MODERATION
===================================================== */
const moderateText = async (text) => {
  const prompt = `
  Analyze this text for inappropriate content.
  Respond with either:
  - SAFE
  - INAPPROPRIATE

  Text: "${text}"
  `;

  const result = await askAI(prompt);
  return result.includes("INAPPROPRIATE");
};

module.exports = {
  generateBio,
  generateIcebreaker,
  calculateCompatibility,
  moderateText,
};
