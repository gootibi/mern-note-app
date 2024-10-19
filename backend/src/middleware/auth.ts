import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export const requiresAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.userId) {
        next();
    } else {
        next(createHttpError(401, "User not authenticated"));
    }
};