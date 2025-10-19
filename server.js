import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRouter from "./chat.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: "*", // allow frontend (localhost or deployed)
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use("/", chatRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
