import React from "react";
import { useNavigate as navigate, Link } from "react-router-dom";
import "./App.css";

const clientId="120968135958-a9lj4l0q1n5s33qsu08pvvbevcrg4nsn.apps.googleusercontent.com";

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
                
            </div>
            <div className="google-login">
            </div>
        </div>
    );
};

export default Landing;
