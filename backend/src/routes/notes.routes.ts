import express, { Router } from "express";
import * as NoteController from "../controllers/notes.controllers";

const router: Router = express.Router();

router.get("/", NoteController.getNotes);
router.get("/:noteId", NoteController.getNoteById);
router.post("/", NoteController.createNote);

export default router;