import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import About from './Components/About';
import Home from './Components/Home';
import NoteState from './context/notes/NoteState';
import Login from './Components/Login';
import Signup from './Components/Signup';


function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <div className="container">
          <Routes>

              <Route path="/" element={<Home/>}/>
            
              <Route path="/about" element={<About/>}/>

              <Route path="/login" element={<Login/>}/>

              <Route path="/signup" element={<Signup/>}/>
                
              
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
