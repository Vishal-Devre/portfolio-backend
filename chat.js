import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/api/chat", async (req, res) => {
  // CORS preflight handle karo
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log("📨 Chat request received");
    
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OpenRouter API key missing");
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://portfoliovd-898.vercel.app",
        "X-Title": "Portfolio Chatbot"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: req.body.messages || [],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message
    });
  }
});

export default router;