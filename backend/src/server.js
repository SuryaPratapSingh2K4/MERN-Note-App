import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import notesRouter from "./routes/NoteRoutes.js";
import usersRouter from "./routes/UserRoutes.js"
import { connectDB } from "./config.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);

app.use("/api/notes", notesRouter);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Connected to localhost PORT : ${process.env.PORT}`);
    });
});

