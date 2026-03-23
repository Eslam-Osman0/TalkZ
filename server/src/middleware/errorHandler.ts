import type { NextFunction, Request, Response } from "express";

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Error", err.message);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
