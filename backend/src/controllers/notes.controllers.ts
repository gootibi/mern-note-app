import { NextFunction, Request, Response } from "express";
import NoteModel, { Note } from "../models/note.model";
import createHttpError from "http-errors";
import mongoose from "mongoose";

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
    const { noteId } = req.params;
    try {
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "Note not found");
        }
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

interface CreateNoteBody {
    title?: string;
    text?: string;
};

export const createNote = async (req: Request<unknown, unknown, CreateNoteBody, unknown>, res: Response<Note>, next: NextFunction) => {
    const { title, text } = req.body;
    try {
        if (!title) {
            throw createHttpError(400, "Note must have a title");
        }

        const newNote = await NoteModel.create({ title, text });
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};
