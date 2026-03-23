import { Router, type Request, type Response } from "express";
import { protectRoutes } from "../middleware/auth";
import { getChats, getOrCreateChat } from "../controllers/chat.controller";

const router = Router();

router.get("/", protectRoutes, getChats);
router.post("/:participantId", protectRoutes, getOrCreateChat);

export default router;
