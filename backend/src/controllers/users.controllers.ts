import { NextFunction, Request, Response } from "express";
import { LoginBody, SignUpBody } from "../interface";
import UserModel, { User } from "../models/user.model";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const getAuthenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.findById(req.session.userId).select("+email").exec();

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const signUp = async (req: Request<unknown, unknown, SignUpBody, unknown>, res: Response<User>, next: NextFunction) => {
    const { username, email } = req.body;
    const passwordRaw = req.body.password;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }

        const existingUsername = await UserModel.findOne({ username: username });
        if (existingUsername) {
            throw createHttpError(409, "Username already exist. Please choose a different one or log in instead.");
        }
        const existingEmail = await UserModel.findOne({ email: email });
        if (existingEmail) {
            throw createHttpError(409, "Email already exist. Please choose a different one or log in instead");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username,
            email,
            password: passwordHashed,
        });

        req.session.userId = newUser._id;

        res.status(201).send(newUser);
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request<unknown, unknown, LoginBody, unknown>, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await UserModel.findOne({ username: username }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "Invalide credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(404, "Invalide credentials");
        }

        req.session.userId = user._id;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((error) => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        };
    });
};