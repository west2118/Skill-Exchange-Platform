import express from "express";
import { postDeal, getUserDeal } from "../controllers/deal.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/deal/:id", verifyToken, postDeal);
router.get("/deal/:id", verifyToken, getUserDeal);

export default router;
