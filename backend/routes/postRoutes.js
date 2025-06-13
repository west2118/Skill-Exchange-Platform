import express from "express";
import { postPost, getPosts } from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/post/:id", verifyToken, postPost);
router.get("/post", getPosts);

export default router;
