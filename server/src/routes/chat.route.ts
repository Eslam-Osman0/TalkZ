import { Router, type Request, type Response } from "express";


const chatRouter = Router();

chatRouter.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello From Chat Route!" });
});

export default chatRouter;