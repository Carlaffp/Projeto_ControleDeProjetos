import { NextFunction, Request, Response } from "express";
import AppError from "../error";

const erro = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.log(err);
  return res.status(500).json({ message: "Internal Server Error" });
};
export default { erro };
