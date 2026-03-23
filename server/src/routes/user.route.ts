import { Router, type Request, type Response } from "express";
import { prisma } from "../config/prisma";
import { getUsers } from "../controllers/user.controller";


const router = Router();

router.get("/", getUsers);

export default router;