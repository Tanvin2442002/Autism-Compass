import React from "react";
import "./Registration.css";

const DoctorReg = () => {
  return (
    <section className="container">
      <header>Registration Form</header>
      <form action="#" className="form">
        <div className="input-box">
          <label>Full Name</label>
          <input type="text" placeholder="Enter Full Name" required />
        </div>
        <div className="input-box">
          <label>Email Address</label>
          <input type="text" placeholder="Enter Email Address" required />
        </div>
        <div className="column">
          <div className="input-box">
            <label>Birth Date</label>
            <input type="date" placeholder="Enter Birth Date" required />
          </div>
        </div>
        <div className="gender-box">
          <h3>Gender</h3>
          <div className="gender-option">
            <div className="gender">
              <input type="radio" id="check-male" name="gender" checked />
              <label for="check-male">Male</label>
            </div>
            <div className="gender">
              <input type="radio" id="check-female" name="gender" />
              <label for="check-female">Female</label>
            </div>
          </div>
        </div>
        <div className="input-box">
          <label>Phone Number</label>
          <input type="text" placeholder="Enter Phone Number" required />
        </div>
        <div className="input-box">
          <label>Degree</label>
          <input type="text" placeholder="Enter Your Degree" required />
        </div>
        <div className="input-box">
          <label>Field of Specialization</label>
          <input
            type="text"
            placeholder="Enter Your Field of Specialization"
            required
          />
        </div>
        <div className="input-box address">
          <label>Address</label>
          <input type="text" placeholder="Address line 1" required />
          <input type="text" placeholder="Address line 2" required />
          <div className="column">
            <div className="input-box">
              <label>Country</label>
              <select className="select-box">
                <option hidden>Country</option>
                <option>Bangladesh</option>
                <option>India</option>
                <option>America</option>
                <option>Japan</option>
                <option>Malaysia</option>
              </select>
            </div>
            <div className="input-box">
              <label>City</label>
              <input type="text" placeholder="Enter your city" required />
            </div>
            <div className="input-box">
              <label>Postal Code</label>
              <input type="text" placeholder="Enter postal code" required />
            </div>
          </div>
        </div>
        <div className="input-box">
          <label>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="input-box">
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

export default DoctorReg;
