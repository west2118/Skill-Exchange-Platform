import express from "express";
import {
  postExchange,
  getUserExchange,
  getAllExchange,
  cancelExchange,
} from "../controllers/exchange.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/exchange", getAllExchange);
router.post("/exchange", verifyToken, postExchange);
router.get("/user-exchange/:id", verifyToken, getUserExchange);
router.put("/exchange/:id", verifyToken, cancelExchange);

export default router;
