import { useState } from "react";
import NotesList from "./Components/NoteList";
import LoginPage from "./Components/LoginPage";
import { Routes, Route } from "react-router-dom";
import UpdatePassword from "./Components/UpdatePassword";

function App() {
  const [isConect, setisConect] = useState(false);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage setisConect={setisConect} />} />
        <Route path="/home" element={<NotesList isConect={isConect} setisConect={setisConect}/>} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
      </Routes>
    </div>
  );
}

export default App;
