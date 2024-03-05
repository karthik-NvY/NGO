import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./Components/Pages/Login/Signup.jsx";
import Login from "./Components/Pages/Login/Login.jsx";
import Verification from "./Components/Pages/Login/Verification";
import WelcomePage from './Components/Pages/Dashboard/WelcomePage';
import Homepage from './Components/Pages/Homepage/Homepage';
import Profilepage from './Components/Pages/Profilepage/Profilepage';
// import Footer from './Components/Dashboard/Footer';

function App() {
  return (
   
     
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/profile" element = {<Profilepage/> } />
            <Route path="/home" element = {<Homepage/> } />
            {/* <Route path="" element={<Contact />} /> */}
            {/* <Route path="*" element={<NoPage />} /> */}
          </Routes>
        </BrowserRouter>
      
);
}

export default App;
