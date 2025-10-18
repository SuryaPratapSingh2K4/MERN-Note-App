import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import notesRouter from "./routes/NoteRoutes.js";
import usersRouter from "./routes/UserRoutes.js";
import { connectDB } from "./config.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB immediately
connectDB()
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err.message));

// Routes
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);

// Example test route (optional)
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working fine!" });
});

// ❌ Do NOT use app.listen()
// ✅ Instead, export the app
export default app;
