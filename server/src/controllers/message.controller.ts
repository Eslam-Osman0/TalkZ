import type { NextFunction, Response } from "express";
import { prisma } from "../config/prisma";
import type { AuthRequest } from "../middleware/auth";

export const getMessages = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;
    const { chatId } = req.params;
    const messages = await prisma.chat.findUnique({
      where: {
        id: chatId as string,
        participants: {
          some: {
            id: userId as string,
          },
        },
      },
      select: {
        messages: {
          include: {
            sender: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!messages) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};
