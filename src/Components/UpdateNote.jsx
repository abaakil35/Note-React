import "./Style/CreateNote.css";
import { useState, useEffect } from "react";
import axios from 'axios';

const UpdateNote = ({ onCancel, title: initialTitle, content: initialContent, sharedWith, id }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedNote = { title, content, sharedWith };
    axios.put(`https://notes.devlop.tech/api/notes/${id}`, updatedNote)
      .then(response => {
        console.log('Note updated:', response.data);
        onCancel(); // Assuming onCancel will refresh the notes list or close the form
      })
      .catch(error => console.error('Error updating note:', error));
  };

  return (
    <div className="create-note-form-container">
      <h1 className="create-note-title">Update Note</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="create-note-labels" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="create-note-labels" htmlFor="content">
            Content:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateNote;