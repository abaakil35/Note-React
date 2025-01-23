import "./Style/UpdateNote.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";

const UpdateNote = ({ onCancel, title: initialTitle, content: initialContent, sharedWith }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [atitle, setAtitle]= useState("");
  const [acontent, setAcontent]= useState("");
  const [updated, setUpdated]= useState(false);
  const id = useParams().id;
  const navigate = useNavigate();




  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSubmit =  async (e) => {
    e.preventDefault();
    const updatedNote = { title, content, sharedWith };
    axios.put(`https://notes.devlop.tech/api/notes/${id}`, updatedNote)
      .then(response => {
        console.log('Note updated:', response.data);
        onCancel(); 
        setUpdated(true)
       
      })
      .catch(error => console.error('Error updating note:', error));
  };
  

  const GetData = () => {
    axios.get(`https://notes.devlop.tech/api/notes/${id}`)
    .then((response )=>{
      setAtitle(response.data.title);
      setAcontent(response.data.content);

    })
  }

const handlegood = () => {
  navigate('/home');
  
}

  useEffect(()=>{
    GetData();
  },[])

  return (
    <div className="update-note-form-container">
      <h1 className="update-note-title">Update Note</h1>
      <form onSubmit={handleSubmit} className="update-note-form">
        <div className="form-group">
          <label className="update-note-label" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            defaultValue={atitle}
            onChange={(e) => setTitle(e.target.value)}
            className="update-note-input"
          />
        </div>
        <div className="form-group">
          <label className="update-note-label" htmlFor="content">
            Content:
          </label>
          <textarea
            id="content"
            defaultValue={acontent}
            onChange={(e) => setContent(e.target.value)}
            className="update-note-textarea"
          />
        </div>
        <button type="submit" onClick={handlegood} className="update-note-button">
          Update Note
        </button>
      </form>
      <Link to="/home" className="update-note-cancel">Cancel</Link>
    </div>
  );
};

export default UpdateNote;