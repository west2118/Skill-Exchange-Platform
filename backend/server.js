import { createRequire } from "module";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

const app = express();

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import exchangeRoutes from "./routes/exchangeRoutes.js";
import dealRoutes from "./routes/dealRoutes.js";

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

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    app.listen(process.env.PORT, () => {
      console.log("Server running");
    });
  })
  .catch((err) => console.log(err));

app.use("/api/", authRoutes);
app.use("/api/", userRoutes);
app.use("/api/", postRoutes);
app.use("/api/", exchangeRoutes);
app.use("/api/", dealRoutes);
