import express from "express";
import {
  postProfile,
  getUsers,
  editOfferedSkills,
  editSeekedSkills,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/user-profile", verifyToken, postProfile);
router.put("/edit-offered/:id", verifyToken, editOfferedSkills);
router.put("/edit-seeked/:id", verifyToken, editSeekedSkills);
router.get("/user", getUsers);

export default router;
