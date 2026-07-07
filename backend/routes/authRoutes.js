import express from "express";
import {
  register,
  login,
  logout,
  refreshSession,
  getProfile,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-session", refreshSession);
router.get("/profile", getProfile);

export default router;
