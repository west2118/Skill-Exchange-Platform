import express from "express";
import {
  postDeal,
  getUserDeal,
  postSession,
  getAllDeal,
} from "../controllers/deal.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/deal", getAllDeal);
router.post("/deal/:id", verifyToken, postDeal);
router.get("/deal/:id", verifyToken, getUserDeal);
router.put("/session/:id", verifyToken, postSession);

export default router;
