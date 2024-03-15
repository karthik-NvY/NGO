import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginSignup from "./Components/Pages/Login/LoginSignup.jsx";
import Verification from "./Components/Pages/Login/Verification";
import WelcomePage from "./Components/Pages/Dashboard/WelcomePage";
import Homepage from "./Components/Pages/Homepage/Homepage";
import Profilepage from "./Components/Pages/Profilepage/Profilepage";
import { Templatepage1 } from "./Components/Pages/Template1page/Templatepage1.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<LoginSignup />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/profile" element={<Profilepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/template1" element={<Templatepage1 />} />
        {/* <Route path="" element={<Contact />} /> */}
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
   
     
      
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element = {<Profile/> } />
            <Route path="/" element={<WelcomePage />} />
          </Routes>
        </BrowserRouter>
      
);
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
