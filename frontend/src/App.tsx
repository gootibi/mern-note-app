import { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note.model';
import Note from './components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "./styles/NotesPage.module.css"
import styleUtils from "./styles/utils.module.css"
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from './components/AddNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <Container>
      <Button onClick={() => setShowAddNoteDialog(true)} className={`mb-4 ${styleUtils.blockCenter}`} >
        Add new note
      </Button>
      <Row xs={1} md={2} lg={4} className='g-4'>
        {notes.map(note => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
      {
        showAddNoteDialog &&
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      }
    </Container>
  );
}

export default App;
