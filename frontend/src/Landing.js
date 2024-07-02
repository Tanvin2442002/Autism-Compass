import React from "react";
import { useNavigate as navigate, Link } from "react-router-dom";
import "./App.css";

const clientId="120968135958-a9lj4l0q1n5s33qsu08pvvbevcrg4nsn.apps.googleusercontent.com";

const Landing = () => {

    // const handleGoogleSuccess = async (credentialResponse) => {
    //     const token = credentialResponse.credential;
    //     const res = await fetch("http://localhost:5000/auth/google", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ token }),
    //     });
    
    //     if (res.ok) {
    //       const data = await res.json();
    //       navigate("/dashboard");
    //       localStorage.setItem("user", JSON.stringify(data));
    //     } else {
    //       console.error("Google login failed");
    //     }
    //   };
    
    //   const handleGoogleError = () => {
    //     console.error("Google login failed");
    //   };

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
            <div className="google-login">
            {/* <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                />
            </GoogleOAuthProvider> */}
            </div>
        </div>
    );
};

export default Landing;
