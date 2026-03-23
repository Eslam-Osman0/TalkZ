import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { prisma } from "../config/prisma";

export const getChats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;
    if (!userId)
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });

    const chats = await prisma.chat.findMany({
      where: {
        participants: {
          some: {
            id: userId as string,
          },
        },
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        messages: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    const formattedChats = chats.map((chat) => ({
      id: chat.id,
      participant: chat.participants[0],
      lastMessage: chat.messages[0],
      lastMessageAt: chat.messages[0]?.createdAt,
      createdAt: chat.createdAt,
    }));

    res.status(200).json({
      success: true,
      message: "Chats fetched successfully",
      data: formattedChats,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

export const getOrCreateChat = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;
    const { participantId } = req.params;
    if (!userId || !participantId)
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });

    // check if chat already exists
    const existingChat = await prisma.chat.findFirst({
      where: {
        participants: {
          every: {
            id: { in: [userId as string, participantId as string] },
          },
        },
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        messages: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!existingChat) {
      const newChat = await prisma.chat.create({
        data: {
          participants: {
            connect: [
              { id: userId as string },
              { id: participantId as string },
            ],
          },
        },
      });
    }

    res.status(200).json({
      id: existingChat?.id,
      participants: existingChat?.participants.find((p) => p.id !== userId),
      lastMessage: existingChat?.messages[0],
      lastMessageAt: existingChat?.messages[0]?.createdAt,
      createdAt: existingChat?.createdAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};
