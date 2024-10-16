import { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note.model';
import Note from './components/Note';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/api/notes", {
          method: "GET",
        });
        const notesRes = await response.json();
        setNotes(notesRes);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <div>
      {notes.map(note => (
        <Note note={note} key={note._id} />
      ))}
    </div>
  );
}

export default App;
