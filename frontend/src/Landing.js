import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const Landing = () => {
    return (
        <div className="landingPage">
            <ul className="LogInSignUpBtn">
                <li>
                    <Link to="/login">Log In</Link>
                </li>
                <div className="signUpContainer">
                    <li>
                        <Link>Sign Up</Link>
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
        </div>
    );
};

export default Landing;
