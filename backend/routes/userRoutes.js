import express from "express";
import { postProfile, getUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/user-profile", verifyToken, postProfile);
router.get("/user", getUsers);

export default router;
