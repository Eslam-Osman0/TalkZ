import { Server as SocketServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { verifyToken } from "@clerk/express";
import { prisma } from "../config/prisma";

export const onlineUsers = new Map<string, string>();

export const initSocketServer = (httpServer: HttpServer) => {
  const io = new SocketServer(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      const session = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });

      const clerkId = session.sub;
      const user = await prisma.user.findUnique({
        where: { clerkId },
      });

      if (!user) {
        return next(new Error("User not found"));
      }
      //socket.userId = user.id >> custom Type if needed
      socket.data.user = user;
      next();
    } catch (error: any) {
      return next(new Error(error));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.data.user?.id;

    socket.emit("Online-Users", { userIds: [...onlineUsers.keys()] });
    onlineUsers.set(userId, socket.id);

    socket.broadcast.emit("User-Connected", { userId });

    socket.join(`user: ${userId}`);

    socket.on("join-chat", (data: { chatId: string }) => {
      socket.join(`chat: ${data.chatId}`);
    });

    socket.on("leave-chat", (data: { chatId: string }) => {
      socket.leave(`chat: ${data.chatId}`);
    });

    socket.on(
      "send-message",
      async (data: { chatId: string; text: string }) => {
        try {
          const chat = await prisma.chat.findUnique({
            where: {
              id: data.chatId,
            },
            include: {
              participants: true,
            },
          });

          if (!chat) {
            socket.emit("socket-error", { message: "Chat not found" });
            return;
          }

          const message = await prisma.message.create({
            data: {
              chatId: data.chatId,
              senderId: userId,
              text: data.text,
            },
          });

          await prisma.chat.update({
            where: {
              id: data.chatId,
            },
            data: {
              lastMessageAt: new Date(),
            },
          });

          io.to(`chat: ${data.chatId}`).emit("new-message", message);

          chat.participants.forEach((participant) => {
            if (participant.id !== userId) {
              io.to(`user: ${participant.id}`).emit("new-message", message);
            }
          });
        } catch (error) {
          socket.emit("socket-error", { message: "Failed to send message" });
        }
      },
    );

    socket.on("typing", (data: { chatId: string; isTyping: boolean }) => {
      socket.broadcast.to(`chat: ${data.chatId}`).emit("typing", data);
    });

    socket.on("disconnect", () => {
      onlineUsers.delete(userId);
      socket.broadcast.emit("User-Disconnected", { userId });
    });
  });

  return io;
};
