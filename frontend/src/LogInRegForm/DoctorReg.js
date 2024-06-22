import React from "react";
import "./Registration.css";

const DoctorReg = () => {
  const handleDoctorRegForm = async (e) => {
    e.preventDefault();

    const doctorData = {
      D_ID: Math.floor(Math.random() * 1000),
      NAME: document.getElementById("full-name").value,
      DOB: document.getElementById("birth-date").value,
      EMAIL: document.getElementById("email").value,
      CONTACT_NO: document.getElementById("phone").value,
      DEGREE: document.getElementById("degree").value,
      FIELD_OF_SPECIALIZATION: document.getElementById(
        "field-of-specialization"
      ).value,
      CITY: document.getElementById("city").value,
      STREET: document.getElementById("street").value,
      POSTAL_CODE: document.getElementById("postal-code").value,
      PASSWORD: document.getElementById("password").value,
      CONFIRM_PASSWORD: document.getElementById("confirm-password").value,
    };
    if (doctorData.PASSWORD !== doctorData.CONFIRM_PASSWORD) {
      alert("Passwords do not match");
      return;
    }
    console.log(doctorData);

  };
  return (
    <section className="container">
      <header>Registration Form</header>
      <form onSubmit={handleDoctorRegForm} className="form">
        <div className="input-box">
          <label>Full Name</label>
          <input
            type="text"
            id="full-name"
            placeholder="Enter Full Name"
            required
          />
        </div>
        <div className="input-box">
          <label>Email Address</label>
          <input
            type="text"
            id="email"
            placeholder="Enter Email Address"
            required
          />
        </div>
        <div className="column">
          <div className="input-box">
            <label>Birth Date</label>
            <input
              type="date"
              id="birth-date"
              placeholder="Enter Birth Date"
              required
            />
          </div>
        </div>
        {/* <div className="gender-box">
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
        </div> */}
        <div className="input-box">
          <label>Phone Number</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter Phone Number"
            required
          />
        </div>
        <div className="input-box">
          <label>Degree</label>
          <input
            type="text"
            id="degree"
            placeholder="Enter Your Degree"
            required
          />
        </div>
        <div className="input-box">
          <label>Field of Specialization</label>
          <input
            type="text"
            id="field-of-specialization"
            placeholder="Enter Your Field of Specialization"
            required
          />
        </div>
        <div className="input-box address">
          <label>Address</label>
          {/* <input type="text" placeholder="Address line 1" required />
          <input type="text" placeholder="Address line 2" required /> */}
          <div className="column">
            <div className="input-box">
              <label>Street</label>
              <input
                type="text"
                id="street"
                placeholder="Enter your street"
                required
              />
            </div>
            <div className="input-box">
              <label>City</label>
              <input
                type="text"
                id="city"
                placeholder="Enter your city"
                required
              />
            </div>
            <div className="input-box">
              <label>Postal Code</label>
              <input
                type="text"
                id="postal-code"
                placeholder="Enter postal code"
                required
              />
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
