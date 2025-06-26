import express from "express";
import {
  postExchange,
  getUserExchange,
  getAllExchange,
  cancelExchange,
  rejectExchange,
} from "../controllers/exchange.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/exchange", getAllExchange);
router.post("/exchange", verifyToken, postExchange);
router.get("/user-exchange/:id", verifyToken, getUserExchange);
router.put("/exchange/:id", verifyToken, cancelExchange);
router.put("/reject-exchange/:id", verifyToken, rejectExchange);

export default router;
