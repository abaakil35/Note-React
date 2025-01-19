import "./Style/CreateNote.css";
import { useState, useEffect } from "react";
import axios from 'axios';

const CreateNote = ({ onCreate, onCancel }) => {
  const [recipient, setRecipient] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://notes.devlop.tech/api/users')
      .then(response => {
        setUsers(response.data);
        console.log(response.data); // Debugging line to check the fetched data
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = { shared_with: recipient, title, content, time: new Date().toLocaleString() };
    console.log('Submitting new note:', newNote); // Debugging line to check the newNote object
    
    axios.post('https://notes.devlop.tech/api/notes', newNote)
      .then(response => {
        console.log('Note created:', response.data); // Debugging line to check the response
        onCreate(response.data);
      })
      .catch(error => console.error('Error adding note:', error));
  };

  const handleRecipientClick = (id) => {
    setRecipient(prevRecipients => {
      if (prevRecipients.includes(id)) {
        return prevRecipients.filter(recipientId => recipientId !== id);
      } else {
        return [...prevRecipients, id];
      }
    });
  };

  return (
    <div className="create-note-form-container">
      <h1 className="create-note-title">Create Note</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="create-note-labels" htmlFor="recipient">
            Send to:
          </label>
          <ul className="available-users">
            {users.map(user => (
              <li
                key={user.id}
                onClick={() => handleRecipientClick(user.id)}
                className={recipient.includes(user.id) ? 'selected' : ''}
              >
                {user.first_name} {user.last_name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label className="create-note-labels" htmlFor="title">
            Title:
          </label>
          <input type="text" id="title" className="create-note-input" placeholder="Title !!" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="create-note-labels" htmlFor="content">
            Content:
          </label>
          <textarea id="content" className="create-note-input" placeholder="Content !!" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <div>
          <label className="create-note-labels" htmlFor="selected-recipients">
            Send to :
          </label>
          <ul id="selected-recipients" className="selected-recipients">
            {recipient.map(id => {
              const user = users.find(user => user.id === id);
              return user ? (
                <li key={id} onClick={() => handleRecipientClick(id)}>
                  {user.first_name} {user.last_name}
                </li>
              ) : null;
            })}
          </ul>
        </div>
        <div className="create-note-button-container">
          <button type="submit" className="create-note-button">Create Note</button>
          <button type="button" className="create-note-button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;