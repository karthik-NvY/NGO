import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Pages/Dashboard/NavBar/NavBar";
import Register from "./Components/Pages/Register/Register";
import Verification from "./Components/Pages/Verification/Verification";
import Homepage from "./Components/Pages/Homepage/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Signup" element={<Register />} />
        <Route path="/Verification" element={<Verification />} />
        <Route path="/NavBar" element={<NavBar />} />
        <Route path="/Home" element = {<Homepage/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
