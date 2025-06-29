import express from "express";
import {
  postPost,
  getPosts,
  getNearbyPosts,
  getUserPost,
  getPerfectMatch,
  putPost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/post", getPosts);
router.put("/post/:id", verifyToken, putPost);
router.post("/post/:id", verifyToken, postPost);
router.get("/post/:id", verifyToken, getNearbyPosts);
router.get("/user-post/:id", verifyToken, getUserPost);
router.get("/user-match/:id", verifyToken, getPerfectMatch);

export default router;
