import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import ChildReg from "./LogInSignUpComponent/ChildReg";
import DoctorReg from "./LogInSignUpComponent/DoctorReg";
import LogIn from "./LogInSignUpComponent/Login";
import ParentReg from "./LogInSignUpComponent/ParentReg";
import TeacherReg from "./LogInSignUpComponent/TeacherReg";
import ResetPass from "./LogInSignUpComponent/ResetPass";
import Profile from "./LogInSignUpComponent/Profile";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup/parent" element={<ParentReg />} />
        <Route path="/signup/child" element={<ChildReg />} />
        <Route path="/signup/doctor" element={<DoctorReg />} />
        <Route path="/signup/teacher" element={<TeacherReg />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/reset-password' element={<ResetPass />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
