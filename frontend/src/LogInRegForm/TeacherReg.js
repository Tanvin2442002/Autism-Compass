import React from "react";
import "./Registration.css";

const TeacherReg = () => {
  return (
    <section class="container">
      <header>Registration Form</header>
      <form action="#" class="form">
        <div class="input-box">
          <label>Full Name</label>
          <input type="text" placeholder="Enter Full Name" required />
        </div>
        <div class="input-box">
          <label>Email Address</label>
          <input type="text" placeholder="Enter Email Address" required />
        </div>
        <div class="column">
          <div class="input-box">
            <label>Birth Date</label>
            <input type="date" placeholder="Enter Birth Date" required />
          </div>
        </div>
        <div class="gender-box">
          <h3>Gender</h3>
          <div class="gender-option">
            <div class="gender">
              <input type="radio" id="check-male" name="gender" checked />
              <label for="check-male">Male</label>
            </div>
            <div class="gender">
              <input type="radio" id="check-female" name="gender" />
              <label for="check-female">Female</label>
            </div>
          </div>
        </div>
        <div class="input-box">
          <label>Phone Number</label>
          <input type="text" placeholder="Enter Phone Number" required />
        </div>
        <div class="input-box">
          <label>School Name</label>
          <input type="text" placeholder="Enter Name of our School" required />
        </div>

        <div class="input-box">
          <label>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
          />
        </div>
        <div class="input-box">
          <label>Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm password"
            required
          />
        </div>
        <button>Submit</button>
      </form>
    </section>
  );
};

export default TeacherReg;
