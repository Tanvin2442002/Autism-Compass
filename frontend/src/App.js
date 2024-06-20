import React from "react";
import "./App.css";

function App() {
  return (
    <div className="landingPage">
      <div className="LogInSignUpBtn">
        <button>Log In</button>
        <div className="signUpContainer">
          <button className="signUpButton">Sign Up</button>
          <div className="signUpOptions">
            <button>Parent</button>
            <button>Child</button>
            <button>Doctor</button>
            <button>Therapy Org.</button>
          </div>
        </div>
      </div>
      <div className="introduction">
        <h2>Welcome to</h2>
        <h1>AUTISM COMPASS</h1>
      </div>
    </div>
  );
}

export default App;
