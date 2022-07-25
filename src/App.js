import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginContext } from "./Components/context/UserContext";
import Home from "./Components/Home";
import ToDo from "./Components/ToDo/ToDo";

function App() {
  const [users, setUsers] = useState(null);
  const [uid, setUid] = useState(null);
  const [userPresent, setUserPresent] = useState(false);

  return (
    <>
      <div className="App">
        <LoginContext.Provider value={{ users, setUsers, uid, setUid,setUserPresent,userPresent }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todo" element={<ToDo />} />
            </Routes>
          </BrowserRouter>
        </LoginContext.Provider>
      </div>
    </>
  );
}

export default App;
