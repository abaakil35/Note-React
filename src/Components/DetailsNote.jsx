import React from 'react';
import './Style/DetailsNote.css'; 

const DetailsNote = ({ title, content, sharedWith, onEdit, onCancel }) => {
  return (
    <div className="details-note">
        <h1>Details Notes </h1>
      <h2>{title}</h2>
      <p>{content}</p>
      <div className="shared-with">
        <h3>Shared with:</h3>
        <ul>
          {sharedWith.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
      <div className="buttons">
        <button className="edit-button" onClick={onEdit}>Edit</button>
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DetailsNote;