import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/error";
export const errorMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let msg = "internal server error"
    if (err instanceof CustomError) {
        statusCode = err.statusCode;
        msg = err.message;
    }
    res.status(statusCode).json({ success: false, msg, err });
}