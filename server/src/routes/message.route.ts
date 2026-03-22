import { Router, type Request, type Response } from "express";
import { prisma } from "../config/prisma";

const messageRouter = Router();

messageRouter.get("/all", (req: Request, res: Response) => {
  try {
    const messages = prisma.message.findMany({});
    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default messageRouter;
