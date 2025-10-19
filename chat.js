// Backend - chat.js mein yeh fix karo
router.post("/api/chat", async (req, res) => {
  try {
    console.log("📨 Chat request received");

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
        messages: req.body.messages,
      }),
    });

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