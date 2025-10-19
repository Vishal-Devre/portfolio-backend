import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRouter from "./chat.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use("/", chatRouter);

// Health check route - IMPORTANT for Vercel
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// Vercel ke liye export
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;