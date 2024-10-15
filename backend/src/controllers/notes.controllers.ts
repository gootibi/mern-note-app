import { NextFunction, Request, Response } from "express";
import NoteModel, { Note } from "../models/note.model";

export const getNotes = async (req: Request, res: Response<Note[]>, next: NextFunction) => {
    try {
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

/* 
    Request:    

    P = path params, expects a [key: string]: string dictionary
    T = response body, expects any
    R = request body, expects any
    S ReqQuery = request query, expects any
    L Locas = request locals, expects any

    Request<P, T, R, S, L>

    ----------------------------------------------------------------

    Response:

    S ReqQuery = response body, expects any
    L Locas = response locals, expects [string]: any

    Response<S, L>
*/

export const getNoteById = async (req: Request<{ noteId: string }>, res: Response<Note>, next: NextFunction) => {
    const { noteId, } = req.params;
    try {
        const note = await NoteModel.findById(noteId).exec();
        if (!note) return next(new Error("Note id not found"));
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

export const createNote = async (req: Request<never, never, Note>, res: Response<Note>, next: NextFunction) => {
    const { title, text } = req.body;
    try {
        const newNote = await NoteModel.create({ title, text });
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};
