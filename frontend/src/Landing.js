import React from "react";
import { useNavigate as navigate, Link } from "react-router-dom";
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
                        <Link to="/signup">Sign Up</Link>
                    </li>
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
