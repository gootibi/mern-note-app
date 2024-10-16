export interface CreateNoteBody {
    title?: string;
    text?: string;
};

export interface NoteIdParams {
    noteId: string;
};

export interface UpdateNoteBody {
    title?: string;
    text?: string;
};