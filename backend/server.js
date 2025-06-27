import { createRequire } from "module";
import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import exchangeRoutes from "./routes/exchangeRoutes.js";
import dealRoutes from "./routes/dealRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { registerSocketServer } from "./lib/socket.js";
import { onlineUsers } from "./lib/socket.js";

const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

export const io = registerSocketServer(server);

app.get("/debug/online-users", (req, res) => {
  res.json(Object.fromEntries(onlineUsers));
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully!");

    server.listen(process.env.PORT, () => {
      console.log(
        `🚀 Server + Socket.IO running on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.log(err));

app.use("/api/", authRoutes);
app.use("/api/", userRoutes);
app.use("/api/", postRoutes);
app.use("/api/", exchangeRoutes);
app.use("/api/", dealRoutes);
app.use("/api/", messageRoutes);
