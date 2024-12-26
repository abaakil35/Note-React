import "./Style/CreateNote.css";
import { useState,useEffect } from "react";
import axios from 'axios';


const CreatNote = ({ onCreate, onCancel }) => {
  const [recipient, setRecipient] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [users, setUsers] = useState([]);
 
  useEffect(() => {
    axios.get('https://notes.devlop.tech/api/users') 
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = { recipient, title, content, time: new Date().toLocaleString() };
    onCreate(newNote);
  
    axios.post('https://notes.devlop.tech/api/users', newNote) 
      .then(response => {
        onCreate(response.data);
      })
      .catch(error => console.error('Error adding note:', error));
  };
  return (
    
    <div className="create-note-form-container">
      <h1 className="create-note-title">Create or Edit Note</h1>
      <form>
        <div>
          <label className="create-note-labels" htmlFor="recipient">
            Send to:
          </label>
            <select id="recipients" multiple value={recipient} onChange={(e) => setRecipient(Array.from(e.target.selectedOptions, option => option.value))} required>
              {users.map(user => (
                <option key={user.id} value={user.name}>{user.name}</option>
              ))}
            </select>
            </div>
        <div>
          <label className="create-note-labels" htmlFor="title">
            Title:
          </label>
          <input type="text" id="title" placeholder="Title !!" required />
        </div>
        <div>
          <label className="create-note-labels" htmlFor="content">
            Content:
          </label>
          <textarea id="content" placeholder="Content !!" required></textarea>
        </div>
        <div className="create-note-buttons">
          <button type="submit">Create Note</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreatNote;
