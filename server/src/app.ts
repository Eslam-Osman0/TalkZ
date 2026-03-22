import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import chatRouter from "./routes/chat.route";
import messageRouter from "./routes/message.route";
import userRouter from "./routes/user.route";

const app = express();

app.use(express.json());

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

export default app;
