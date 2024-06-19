import React from 'react';
import './Login.css'

const LogIn = () => {
  return (
    <div class="wrapper">
      <form action="">
        <h1>WELCOME!</h1>
        <div class="input-box">
          <input type="text" placeholder="Username" required />
          <i class="bx bxs-user"></i>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Password" required />
          <i class="bx bxs-lock-alt"></i>
        </div>
        <div class="input-box">
          <select required>
            <option value="" disabled selected>
              Who is logging in?
            </option>
            <option value="child">Child</option>
            <option value="parent">Parent</option>
            <option value="teacher">Teacher</option>
            <option value="doctor">Doctor</option>
          </select>
          <i class="bx bxs-down-arrow"></i>
        </div>
        <div class="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember Me
          </label>
          <a href="#">Forgot Password</a>
        </div>
        <button type="submit" class="btn">
          LOGIN
        </button>
        <div class="register-link">
          <p>
            Don't have an account? <a href="#">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
