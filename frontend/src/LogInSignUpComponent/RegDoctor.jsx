import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Registration.css";


const DoctorReg = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleDoctorRegForm = async (e) => {
    e.preventDefault();

    const doctorData = {
      H_ID: Math.floor(Math.random() * 1000),
      NAME: document.getElementById("full-name").value,
      EMAIL: document.getElementById("email").value,
      CONTACT_NO: document.getElementById("phone").value,
      DEGREE: document.getElementById("degree").value,
      FIELD_OF_SPEC: document.getElementById("field-of-specialization").value,
      NAME_OF_HOSPITAL: document.getElementById("name-of-hospital").value,
      VISIT_TIME: document.getElementById("visit-time").value,
      CITY: document.getElementById("city").value,
      STREET: document.getElementById("street").value,
      POSTAL_CODE: document.getElementById("postal-code").value,
      PASSWORD: document.getElementById("password").value,
      CONFIRM_PASSWORD: document.getElementById("confirm-password").value,
    };
    if (doctorData.PASSWORD !== doctorData.CONFIRM_PASSWORD) {
      console.log("Passwords do not match");
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    console.log(doctorData);
    const response = await fetch("http://localhost:5000/reg/doctor", {
      method: "POST",
      body: JSON.stringify(doctorData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.message === "Doctor registered successfully!")
      navigate("/login");
    else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="registration-contents">
      <section className="registration-section">
        <ToastContainer />
        <div className="registration-main-part">
          <header>Doctor Registration Form</header>
          <form onSubmit={handleDoctorRegForm} className="registration-form">
            <div className="registration-input-box">
              <label>Full Name</label>
              <input
                type="text"
                id="full-name"
                placeholder="Enter Full Name"
                required
              />
            </div>
            <div className="registration-input-box">
              <label>Email Address</label>
              <input
                type="text"
                id="email"
                placeholder="Enter Email Address"
                required
              />
            </div>
            <div className="registration-input-box">
              <label>Phone Number</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter Phone Number"
                required
              />
            </div>
            <div className="registration-input-box">
              <label>Degree</label>
              <input
                type="text"
                id="degree"
                placeholder="Enter Your Degree"
                required
              />
            </div>
            <div className="registration-input-box">
              <label>Field of Specialization</label>
              <input
                type="text"
                id="field-of-specialization"
                placeholder="Enter Your Field of Specialization"
                required
              />
            </div>
            <div className="registration-input-box">
              <label>Name of Hospital</label>
              <input
                type="text"
                id="name-of-hospital"
                placeholder="Enter Name of Hospital"
                required
              />
            </div>
            <div className="registration-input-box">
              <label>Visit Time</label>
              <input
                type="text"
                id="visit-time"
                placeholder="Enter Visit Time"
                required
              />
            </div>
            <label >Address of Hospital</label>
            <div className="registration-address">
              <div className="registration-input-box">
                <label>Street</label>
                <input
                  type="text"
                  id="street"
                  placeholder="Enter your street"
                  required
                />
              </div>
              <div className="registration-input-box">
                <label>City</label>
                <input
                  type="text"
                  id="city"
                  placeholder="Enter your city"
                  required
                />
              </div>
              <div className="registration-input-box">
                <label>Postal Code</label>
                <input
                  type="text"
                  id="postal-code"
                  placeholder="Enter postal code"
                  required
                />
              </div>
            </div>
            <div className="registration-input-box">
              <label>Password</label>
              <div className="registration-password">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter password"
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={toggleShowPassword}
                  className="password-icon"
                />
              </div>
            </div>
            <div className="registration-input-box">
              <label>Confirm Password</label>
              <div className="registration-password">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Confirm password"
                  required
                />
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  onClick={toggleShowConfirmPassword}
                  className="password-icon"
                />
              </div>
            </div>
            <button type="submit"
              className="registration-submit-button">
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default DoctorReg;
