import express from "express";
import {
  sendMessage,
  getUsersSidebar,
  getMessage,
} from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/sidebar-messages/:id", verifyToken, getUsersSidebar);
router.get("/messages/:id", verifyToken, getMessage);
router.post("/message/:id", verifyToken, sendMessage);

export default router;
