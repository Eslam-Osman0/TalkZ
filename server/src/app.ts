import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import chatRouter from "./routes/chat.route";
import messageRouter from "./routes/message.route";
import userRouter from "./routes/user.route";
import { clerkMiddleware } from "@clerk/express";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);

app.use(errorHandler)

export default app;
