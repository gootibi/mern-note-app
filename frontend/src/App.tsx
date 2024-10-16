import { useEffect, useState } from 'react';
import './App.css';
import { Note } from './models/note.model';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

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
    <div className="App">
      {JSON.stringify(notes)}
    </div>
  );
}

export default App;
