// filepath: /c:/Users/Abaakil Ayoub/Documents/GitHub/Note-React/src/Components/UpdateNote.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateNote from "./CreateNote";
import "./Style/CreateNote.css";

const UpdateNote = ({ noteId, onUpdate }) => {
  const [note, setNote] = useState({ title: "", content: "", recipient: [] });

  useEffect(() => {
    // Fetch the note data to populate the form
    axios.get(`https://notes.devlop.tech/api/notes/${noteId}`)
      .then(response => {
        setNote(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the note data!", error);
      });
  }, [noteId]);

  const handleSave = (noteData, isEditMode) => {
    axios.put(`https://notes.devlop.tech/api/notes/${noteId}`, noteData)
      .then(response => {
        onUpdate(response.data);
      })
      .catch(error => {
        console.error("There was an error updating the note!", error);
      });
  };

  return (
    <CreateNote
      users={note.shared_with} // Assuming users are part of the note data
      noteToEdit={note}
      onSave={handleSave}
    />
  );
};

export default UpdateNote;