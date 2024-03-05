import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginSignup from "./Components/Pages/Login/LoginSignup.jsx";
import Verification from "./Components/Pages/Login/Verification";
import WelcomePage from './Components/Pages/Dashboard/WelcomePage';
import Homepage from './Components/Pages/Homepage/Homepage';
import Todopage from './Components/Pages/TodoList/TodoListpage';
import Profilepage from './Components/Pages/Profilepage/Profilepage';
// import Footer from './Components/Dashboard/Footer';

function App() {
  return (
   
     
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signup" element={<LoginSignup />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/profile" element = {<Profilepage/> } />
            <Route path="/home" element = {<Homepage/> } />
            <Route path="/todo" element = {<Todopage/> } />
            {/* <Route path="" element={<Contact />} /> */}
            {/* <Route path="*" element={<NoPage />} /> */}
          </Routes>
        </BrowserRouter>
      
);
}

export default App;
