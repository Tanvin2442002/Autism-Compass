import React from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const TeacherReg = () => {
  const navigate = useNavigate();
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
      alert("Passwords do not match");
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
    // let data = await response.json();
    // console.log(data);
    localStorage.setItem("teacher", JSON.stringify(teacherData));
    navigate("/dashboard");
  };

  return (
    <section className="container">
      <header>Teacher Registration Form</header>
      <form onSubmit={handleTeacherRegForm} className="form">
        <div className="input-box">
          <label htmlFor="full-name">Full Name</label>
          <input
            type="text"
            id="full-name"
            placeholder="Enter Full Name"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email Address"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter Phone Number"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="school-name">Institution Name</label>
          <input
            type="text"
            id="institution-name"
            placeholder="Enter Name of your School"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm password"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default TeacherReg;



