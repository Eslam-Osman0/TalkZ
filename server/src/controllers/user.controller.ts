import type { NextFunction, Response } from "express";
import { prisma } from "../config/prisma";
import type { AuthRequest } from "../middleware/auth";

export const getUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
      },
      select: {
        name: true,
        id: true,
        email: true,
        avatar: true,
      },
      take: 50,
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500);
    next(error);
  }
};
