import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { CreateNoteBody, NoteIdParams, UpdateNoteBody } from "../interface";
import NoteModel, { Note } from "../models/note.model";
import { assertIsDefined } from "../utils/assertIsDefined";

export const getNotes = async (req: Request, res: Response<Note[]>, next: NextFunction) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        const notes = await NoteModel.find({ userId: authenticatedUserId }).exec();
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

export const getNoteById = async (req: Request<NoteIdParams>, res: Response<Note>, next: NextFunction) => {
    const { noteId } = req.params;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        if (!note.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this note");
        }
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

export const createNote = async (req: Request<unknown, unknown, CreateNoteBody, unknown>, res: Response<Note>, next: NextFunction) => {
    const { title, text } = req.body;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!title) {
            throw createHttpError(400, "Note must have a title");
        }

        const newNote = await NoteModel.create({
            userId: authenticatedUserId,
            title,
            text
        });
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};

export const updateNote = async (req: Request<NoteIdParams, unknown, UpdateNoteBody, unknown>, res: Response<Note>, next: NextFunction) => {
    const { noteId } = req.params;
    const { title, text } = req.body;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        if (!title) {
            throw createHttpError(400, "Note must have a title");
        }

        const updatedNote = await NoteModel.findById(noteId).exec();

        if (!updatedNote) {
            throw createHttpError(404, "Note not found");
        }

        if (!updatedNote.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this note");
        }

        updatedNote.title = title;
        updatedNote.text = text;

        await updatedNote.save();
        /*
            Or simple use this.:
             const updatedNote await NoteModel.findByIdAndUpdate(noteId, {title, text}, {new: true}).exec();
        */
        res.status(200).json(updatedNote);
    } catch (error) {
        next(error);
    }
};

export const deleteNote = async (req: Request<NoteIdParams, unknown, unknown, unknown>, res: Response, next: NextFunction) => {
    const { noteId } = req.params;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const deleteNote = await NoteModel.findById(noteId).exec();
        if (!deleteNote) {
            throw createHttpError(404, "Note not found");
        }

        if (!deleteNote.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this note");
        }

        await NoteModel.deleteOne({ _id: noteId });
        /*
            Or simple use this.:
            const deleteNote = await NoteModel.findByIdAndDelete(noteId).exec();
        */
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
