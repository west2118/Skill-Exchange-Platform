import express from "express";
import { postPost } from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/post/:id", verifyToken, postPost);

export default router;
