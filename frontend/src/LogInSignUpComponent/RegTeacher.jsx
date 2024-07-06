import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MergedStyles.css";

const TeacherReg = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleTeacherRegForm = async (e) => {
    e.preventDefault();

    const teacherData = {
      T_ID: Math.floor(Math.random() * 1000),
      NAME: document.getElementById("full-name").value,
      EMAIL: document.getElementById("email").value,
      CONTACT_NO: document.getElementById("phone").value,
      INSTITUTION: document.getElementById("institution-name").value,
      PASSWORD: document.getElementById("password").value,
      CONFIRM_PASSWORD: document.getElementById("confirm-password").value,
    };
    if (teacherData.PASSWORD !== teacherData.CONFIRM_PASSWORD) {
      console.log("Passwords do not match");
      toast.error("Passwords do not match!", {
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
    console.log(teacherData);
    const response = await fetch("http://localhost:5000/reg/teacher", {
      method: "POST",
      body: JSON.stringify(teacherData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    console.log(data);
    // localStorage.setItem("teacher", JSON.stringify(teacherData));
    navigate("/login");
  };

  return (
    <>
      <section className="teacher-registration-container-unique">
        <ToastContainer />
        <header>Teacher Registration Form</header>
        <form onSubmit={handleTeacherRegForm} className="teacher-registration-form-unique">
          <div className="teacher-registration-input-box-unique">
            <label htmlFor="full-name">Full Name</label>
            <input
              type="text"
              id="full-name"
              placeholder="Enter Full Name"
              required
            />
          </div>
          <div className="teacher-registration-input-box-unique">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email Address"
              required
            />
          </div>
          <div className="teacher-registration-input-box-unique">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter Phone Number"
              required
            />
          </div>
          <div className="teacher-registration-input-box-unique">
            <label htmlFor="institution-name">Institution Name</label>
            <input
              type="text"
              id="institution-name"
              placeholder="Enter Name of your School"
              required
            />
          </div>
          <div className="teacher-registration-input-box-unique">
            <label>Password</label>
            <div className="teacher-registration-password-container-unique">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={toggleShowPassword}
                className="teacher-registration-password-icon-unique"
              />
            </div>
          </div>
          <div className="teacher-registration-input-box-unique">
            <label>Confirm Password</label>
            <div className="teacher-registration-password-container-unique">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                placeholder="Confirm password"
                required
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                onClick={toggleShowConfirmPassword}
                className="teacher-registration-password-icon-unique"
              />
            </div>
          </div>
          <button type="submit" className="teacher-registration-form-unique-button">Submit</button>
        </form>
      </section>
    </>
  );
};

export default TeacherReg;
