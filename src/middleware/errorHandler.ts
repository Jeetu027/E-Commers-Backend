import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errorHandle/errorHandle";
import { error } from "console";

const ErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500).json({
    error: err.message || "internal server error!!",
  });
};
export { ErrorHandler };
