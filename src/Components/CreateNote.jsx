import "./Style/CreateNote.css";

const CreatNote = () => {
  return (
    div >
    (
      <div className="form-container">
        <h1 className="title">Create or Edit Note</h1>
        <form>
          <div>
            <label className="labels" for="recipient">
              Send to:
            </label>
            <select id="recipient" required>
              <option value="">Select One</option>
              <option value="John">John</option>
              <option value="Alice">Alice</option>
              <option value="Bob">Bob</option>
            </select>
          </div>

          <div>
            <label className="labels" for="title">
              Title:
            </label>
            <input type="text" id="content" placeholder="Title !!" required />
          </div>

          <div>
            <label className="labels" for="content">
              Content:
            </label>
            <textarea id="content" placeholder="Content !!" required></textarea>
          </div>

          <div className="buttons">
            <button type="submit">Create Note</button>
            <button type="button">Cancel</button>
          </div>
        </form>
      </div>
    )
  );
};
export default CreatNote;
