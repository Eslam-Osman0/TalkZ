import { Router, type Request, type Response } from "express";
import { prisma } from "../config/prisma";
import { getUsers } from "../controllers/user.controller";
import { protectRoutes } from "../middleware/auth";

const router = Router();

router.use(protectRoutes);

router.get("/", getUsers);

export default router;
