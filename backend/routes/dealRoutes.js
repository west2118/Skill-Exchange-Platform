import express from "express";
import { postDeal } from "../controllers/deal.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/deal/:id", verifyToken, postDeal);

export default router;
