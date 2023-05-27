import './App.css';
import React, { useState } from 'react';
import Home from './component/Home.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './component/Navbar';
import NoteState from './context/notes/NotesState';
import Login from './component/Login';
import Signup from './component/Signup';
import Alert from "./component/Alert";


function App() {
  const [mode, setMode] = useState("light");

  const toogle = () => {
    // console.log(selectedOption, "selectedOption")
    if (mode === "light") {
      document.body.style.backgroundColor = "rgb(136 136 207)";
      document.body.style.color = "white";
      setMode("dark",);
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      setMode("light");
    }

  }

  return (
    <>
      <Router>

        <NoteState>

          <Navbar mode={mode} toogle={toogle} />
          <Alert/>
          <Routes>
            <Route exact path="/" element={<Home mode={mode} />} />
            <Route exact path="/login" element={<Login mode={mode} />} />
            <Route exact path="/signup" element={<Signup mode={mode} />} />
          </Routes>
        </NoteState>
      </Router>
    </>
  );
}

export default App;
