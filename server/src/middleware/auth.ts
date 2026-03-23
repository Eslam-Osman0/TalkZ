import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { requireAuth } from "@clerk/express";
import { prisma } from "../config/prisma";

export type AuthRequest = Request & { userId?: string };

export const protectRoutes = [
  requireAuth(),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { userId: clerkId } = getAuth(req);

      if (!clerkId) return res.status(401).json({ error: "Unauthorized" });

      const user = await prisma.user.findUnique({ where: { clerkId } });

      if (!user) return res.status(404).json({ error: "User not found" });

      req.userId = user.id;
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
];
