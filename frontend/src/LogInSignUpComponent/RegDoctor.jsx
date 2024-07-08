import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./MergedStyles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        theme: "light",
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
    <section className="doctor-registration-container-unique">
      <ToastContainer />
      <header>Doctor Registration Form</header>
      <form onSubmit={handleDoctorRegForm} className="doctor-registration-form-unique">
        <div className="doctor-registration-input-box-unique">
          <label>Full Name</label>
          <input
            type="text"
            id="full-name"
            placeholder="Enter Full Name"
            required
          />
        </div>
        <div className="doctor-registration-input-box-unique">
          <label>Email Address</label>
          <input
            type="text"
            id="email"
            placeholder="Enter Email Address"
            required
          />
        </div>
        <div className="doctor-registration-input-box-unique">
          <label>Phone Number</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter Phone Number"
            required
          />
        </div>
        <div className="doctor-registration-input-box-unique">
          <label>Degree</label>
          <input
            type="text"
            id="degree"
            placeholder="Enter Your Degree"
            required
          />
        </div>
        <div className="doctor-registration-input-box-unique">
          <label>Field of Specialization</label>
          <input
            type="text"
            id="field-of-specialization"
            placeholder="Enter Your Field of Specialization"
            required
          />
        </div>
        <div className="doctor-registration-input-box-unique address">
          <label>Address</label>
          <div className="doctor-registration-column-unique">
            <div className="doctor-registration-input-box-unique">
              <label>Street</label>
              <input
                type="text"
                id="street"
                placeholder="Enter your street"
                required
              />
            </div>
            <div className="doctor-registration-input-box-unique">
              <label>City</label>
              <input
                type="text"
                id="city"
                placeholder="Enter your city"
                required
              />
            </div>
            <div className="doctor-registration-input-box-unique">
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
        <div className="doctor-registration-input-box-unique">
          <label>Password</label>
          <div className="doctor-registration-password-container-unique">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={toggleShowPassword}
              className="doctor-registration-password-icon-unique"
            />
          </div>
        </div>
        <div className="doctor-registration-input-box-unique">
          <label>Confirm Password</label>
          <div className="doctor-registration-password-container-unique">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              placeholder="Confirm password"
              required
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              onClick={toggleShowConfirmPassword}
              className="doctor-registration-password-icon-unique"
            />
          </div>
        </div>
        <button className="doctor-registration-form-unique">Submit</button>
      </form>
    </section>
  );
};

export default DoctorReg;
