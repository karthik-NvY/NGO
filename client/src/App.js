import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginSignup from "./Components/Pages/Login/LoginSignup.jsx";
import Verification from "./Components/Pages/Login/Verification";
import WelcomePage from './Components/Pages/Dashboard/WelcomePage';
// import Footer from './Components/Dashboard/Footer';

function App() {
  return (
   
     
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signup" element={<LoginSignup />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/verification" element={<Verification />} />
            {/* <Route path="" element={<Contact />} /> */}
            {/* <Route path="*" element={<NoPage />} /> */}
          </Routes>
        </BrowserRouter>
      
   
  );
}

export default App;
