import { Router, type Request, type Response } from "express";
import { prisma } from "../config/prisma";
import { protectRoutes } from "../middleware/auth";
import { getMessages } from "../controllers/message.controller";

const router = Router();


router.get('/:chatId', protectRoutes, getMessages)

export default router;
