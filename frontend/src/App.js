import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import ChildReg from "./LogInRegForm/ChildReg";
import DoctorReg from "./LogInRegForm/DoctorReg";
import LogIn from "./LogInRegForm/Login";
import ParentReg from "./LogInRegForm/ParentReg";
import TeacherReg from "./LogInRegForm/TeacherReg";

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
      </Routes>
    </Router>
  );
}

export default App;
