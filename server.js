// server.js - WORKING CODE WITH AI
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Chat endpoint - NOW WITH WORKING AI
app.post("/chat", async (req, res) => {
  try {
    console.log("📨 Chat request received");
    
    const { messages } = req.body;
    
    if (!messages) {
      return res.status(400).json({ error: "Messages are required" });
    }

    console.log("Calling OpenRouter API...");
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Portfolio Chatbot"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful portfolio assistant for Vishal. Keep responses concise and helpful. Answer questions about Vishal's skills, projects, experience, and background."
          },
          ...messages
        ],
      }),
    });

    console.log("OpenRouter status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", errorText);
      throw new Error(`OpenRouter error: ${response.status}`);
    }

    const data = await response.json();
    console.log("OpenRouter response received");
    
    res.json(data);
    
  } catch (error) {
    console.error("❌ Backend Error:", error);
    res.status(500).json({ 
      error: "Backend error",
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}`);
});