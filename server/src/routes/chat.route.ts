import { Router, type Request, type Response } from "express";
import { protectRoutes } from "../middleware/auth";
import { getChats, getOrCreateChat } from "../controllers/chat.controller";

const router = Router();

router.use(protectRoutes);

router.get("/", getChats);
router.post("/:participantId", getOrCreateChat);

export default router;
