import styles from "../styles/Note.module.css"
import styleUtils from "../styles/utils.module.css"
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note.model";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md"

interface NoteProps {
    note: NoteModel;
    onNoteClick: (note: NoteModel) => void;
    onDeleteNoteClick: (note: NoteModel) => void;
    className?: string;
};

const Note = ({ note, onNoteClick, className, onDeleteNoteClick }: NoteProps) => {

    const {
        title,
        text,
        createdAt,
        updatedAt
    } = note;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    return (
        <Card
            className={`${styles.noteCard} ${className}`}
            onClick={() => onNoteClick(note)}
        >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteNoteClick(note);
                            e.stopPropagation();
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
};

export default Note;