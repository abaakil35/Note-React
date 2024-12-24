
import { useState } from "react";
import NotesList from "./Components/NoteList";
import LoginPage from "./Components/LoginPage";

function App() {
  const [isConect, setisConect] = useState(false);
  
  return (
    <div>{isConect ? <NotesList /> : <LoginPage setisConect={setisConect} />}</div>
  );
}


export default App;
