import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Pages/Login/Login";
import WelcomePage from './Components/Pages/Dashboard/WelcomePage';
import Profile from './Components/Pages/Profile/Profile';
import NavBar from "./Components/Pages/Dashboard/NavBar/NavBar";
import Register from "./Components/Pages/Register/Register";
import Verification from "./Components/Pages/Verification/Verification";
import Homepage from "./Components/Pages/Homepage/Homepage";
import { TemplateView } from "./Components/Pages/TemplateView/TemplateView";


function App() {
  return (



    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Signup" element={<Register />} />
        <Route path="/Verification" element={<Verification />} />
        <Route path="/NavBar" element={<NavBar />} />
        <Route path="/Home" element={<Homepage />} />
        <Route path="/templateview" element={<TemplateView />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
