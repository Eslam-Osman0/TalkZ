import type { AuthRequest } from "../middleware/auth";
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import { clerkClient, getAuth } from "@clerk/express";

export const getMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500);
    next(error);
  }
};

export const authCallback = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId: clerkId } = getAuth(req);

    if (!clerkId) return res.status(401).json({ error: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(clerkId);

      const newUser = await prisma.user.create({
        data: {
          clerkId,
          email: clerkUser.emailAddresses[0]?.emailAddress as string,
          name: clerkUser.firstName
            ? `${clerkUser.firstName} ${clerkUser.lastName}`.trim()
            : (clerkUser.emailAddresses[0]?.emailAddress.split(
                "@",
              )[0] as string),
          avatar: clerkUser.imageUrl,
        },
      });

      return res.status(200).json({ user: newUser });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500);
    next(error);
  }
};
