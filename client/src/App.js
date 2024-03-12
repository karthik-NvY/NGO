import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/Pages/Login/Login";

import WelcomePage from './Components/Pages/Dashboard/WelcomePage';
import Profile from './Components/Pages/Profile/Profile';


function App() {
  return (
   
     
      
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element = {<Profile/> } />
            <Route path="/" element={<WelcomePage />} />
          </Routes>
        </BrowserRouter>
      
);
}

export default App;
