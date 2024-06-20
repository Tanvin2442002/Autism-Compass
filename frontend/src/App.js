import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LogIn from "./LogInRegForm/Login";
import ParentReg from "./LogInRegForm/ParentReg";
import DoctorReg from "./LogInRegForm/DoctorReg";
import ChildReg from "./LogInRegForm/ChildReg";
import TeacherReg from "./LogInRegForm/TeacherReg";

function App() {
  return (
    <Router>
      <div className="landingPage">
        <ul className="LogInSignUpBtn">
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <div className="signUpContainer">
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <div className="signUpOptions">
              <li>
                <Link to="/signup/parent">Parent</Link>
              </li>
              <li>
                <Link to="/signup/child">Child</Link>
              </li>
              <li>
                <Link to="/signup/doctor">Doctor</Link>
              </li>
              <li>
                <Link to="/signup/teacher">Teacher</Link>
              </li>
            </div>
          </div>
        </ul>
        <div className="introduction">
          <h2>Welcome to</h2>
          <h1>AUTISM COMPASS</h1>
        </div>

        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup/parent" element={<ParentReg />} />
          <Route path="/signup/child" element={<ChildReg />} />
          <Route path="/signup/doctor" element={<DoctorReg />} />
          <Route path="/signup/teacher" element={<TeacherReg />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
