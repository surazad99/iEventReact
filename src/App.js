import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState({type: "", msg: ""});
  const showAlert = (type, message)=> {
    setAlert({type:type, msg:message});
    // setTimeout(()=>{
    //   setAlert(null);
    // },1500);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} showAlert={showAlert} />
          <Routes>
            <Route exact path="/" index element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" index element={<About />} />
            <Route exact path="/login" index element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" index element={<Signup showAlert={showAlert} />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
