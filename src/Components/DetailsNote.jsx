import React from 'react';
import './Style/DetailsNote.css'; 
import moment from "moment";

const DetailsNote = ({ title, content, sharedWith, onEdit, onCancel, date }) => {
    const formatDate = (timestamp) => {
        return moment(timestamp).format("ddd, DD MMM YYYY");
      };


  return (
    <div className="details-note">
        <h1>Details Notes </h1>
        <div className='two'>
        <div className='info'>
      <h2> Title :      {title}</h2>
      <p> Content :     {content}</p>
      <p> Date:   {formatDate(date)} </p>
      </div>
      <div className="shared-with">
        <h3>Shared with:</h3>
        <ul>
          {sharedWith.map(user => (
            <li key={user.id}>
              <div className="user">
                <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
      <div className="buttons">
        <button className="edit-button" onClick={onEdit}>Edit</button>
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DetailsNote;