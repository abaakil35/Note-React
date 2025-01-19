import { useState } from "react";
import NotesList from "./Components/NoteList";
import LoginPage from "./Components/LoginPage";
import { Routes, Route } from "react-router-dom";
import UpdatePassword from "./Components/UpdatePassword";
import MyNotesOnly from "./Components/MyNotesOnly";



function App() {
  const [isConect, setisConect] = useState(false);

  return (
    <div>
      {isConect ? <NotesList setisConect={setisConect} /> : <LoginPage setisConect={setisConect} />}
    <Routes>
    <Route path="/updatepassword" element={<UpdatePassword />} />
    <Route path="/mynotesonly" element={<MyNotesOnly />} />
  </Routes>
    </div>
  );

}

export default App;