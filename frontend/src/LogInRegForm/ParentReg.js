import React, { useState } from "react";
import "./Registration.css";

const ParentReg = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    birthDate: "",
    gender: "Male",
    phoneNumber: "",
    streetAddress1: "",
    streetAddress2: "",
    country: "",
    city: "",
    postalCode: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section className="container">
      <header>Registration Form</header>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-box">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-box">
          <label>Email Address</label>
          <input
            type="text"
            name="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="column">
          <div className="input-box">
            <label>Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="gender-box">
          <h3>Gender</h3>
          <div className="gender-option">
            <div className="gender">
              <input
                type="radio"
                id="check-male"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              <label htmlFor="check-male">Male</label>
            </div>
            <div className="gender">
              <input
                type="radio"
                id="check-female"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              <label htmlFor="check-female">Female</label>
            </div>
          </div>
        </div>
        <div className="input-box">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-box address">
          <label>Address</label>
          <input
            type="text"
            name="streetAddress1"
            placeholder="Enter street address"
            value={formData.streetAddress1}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="streetAddress2"
            placeholder="Enter street address 2"
            value={formData.streetAddress2}
            onChange={handleChange}
            required
          />
          <div className="column">
            <div className="input-box">
              <label>Country</label>
              <select
                name="country"
                className="select-box"
                value={formData.country}
                onChange={handleChange}
                required
              >
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
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <label>Postal Code</label>
              <input
                type="number"
                name="postalCode"
                placeholder="Enter postal code"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="input-box">
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-box">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirm-password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default ParentReg;
