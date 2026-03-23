import { Router } from "express";
import { getMe } from "../controllers/auth.controller";
import { protectRoutes } from "../middleware/auth";
import { authCallback } from "../controllers/auth.controller";

const router = Router();

router.get("/me", protectRoutes, getMe);
router.get("/callback", authCallback);

export default router;
