import { Router, type Request, type Response } from "express";
import { prisma } from "../config/prisma";


const userRouter = Router();

userRouter.get("/", (req: Request, res: Response) => {
    try {
        const users = prisma.user.findMany({});
        return res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default userRouter;