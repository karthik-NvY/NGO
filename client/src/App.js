import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Taskpage } from "./Components/Pages/Taskpage/Taskpage";
import Login from "./Components/Pages/Login/Login";
import Template1 from "./Components/Pages/NgoView/Templatepage1/Template1";
import WelcomePage from './Components/Pages/Dashboard/WelcomePage';
import Profile from './Components/Pages/Profile/Profile';
import NavBar from "./Components/Pages/Dashboard/NavBar/NavBar";
import Register from "./Components/Pages/Register/Register";
import Verification from "./Components/Pages/Verification/Verification";
import Homepage from "./Components/Pages/Homepage/Homepage";
import { TemplateView } from "./Components/Pages/TemplateView/TemplateView";
import Template1edit  from "./Components/Pages/Template1edit/Template1edit";
import AllTasks from "./Components/Pages/AllTasks/AllTasks";

import TaskAssign from "./Components/Pages/TaskAssign/TaskAssign";

function App() {
  return (



    <BrowserRouter>
      <Routes>
        <Route path="/Taskpage" element={<Taskpage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/ngo/:name/:ngo_id" element={<Template1 />} />
        <Route path="/Signup" element={<Register />} />
        <Route path="/Verification" element={<Verification />} />
        <Route path="/NavBar" element={<NavBar />} />
        <Route path="/Home" element={<Homepage />} />
        <Route path="/templateview" element={<TemplateView />} />
        <Route path="/template1edit" element={<Template1edit />} />
        <Route path="/AllTasks" element={<AllTasks />} />
        <Route path ="/taskassign" element = {<TaskAssign/>} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
