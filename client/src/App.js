import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./Components/Pages/Homepage/Homepage.jsx";
import Profilepage from "./Components/Pages/Profile/Profile.jsx";
import {Login} from "./Components/Pages/Login/Login.jsx" 
import { Templatepage1 } from "./Components/Pages/Template1page/Templatepage1.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Signup" element={<LoginSignup />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/Verification" element={<Verification />} />
        <Route path="/profile" element={<Profilepage />} />
        <Route path="/Home" element={<Homepage />} />
        <Route path="/NavBar" element={<NavBar />} />
        <Route path="/template1" element={<Templatepage1 />} />
        {/* <Route path="" element={<Contact />} /> */}
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
