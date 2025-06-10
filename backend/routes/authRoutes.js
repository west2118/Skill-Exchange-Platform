import express from "express";
import {
  sessionLogin,
  refreshSession,
  getProfile,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/session-login", sessionLogin);
router.post("/refresh-session", refreshSession);
router.get("/profile", getProfile);

export default router;
