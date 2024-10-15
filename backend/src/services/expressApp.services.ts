import "dotenv/config"
import express, { Application, NextFunction, Request, Response } from "express";
import noteRoutes from "../routes/notes.routes";
import morgan from "morgan";

const app: Application = express();

app.use(morgan("dev"))

app.use(express.json());

app.use("/api/notes", noteRoutes);

app.use((req, res, next) => {
    next(Error("Endpoint Not Found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
        errorMessage = error.message;
        res.status(500).json({ error: errorMessage });
    }
});

export default app;
