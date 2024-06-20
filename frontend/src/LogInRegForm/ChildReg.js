import React from "react";
import "./Registration.css";

const ChildReg = () => {
  return (
    <section className="container">
      <header>Registration Form</header>
      <form action="#" className="form">
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
        <div className="column">
          <div className="input-box">
            <label htmlFor="birth-date">Birth Date</label>
            <input
              type="date"
              id="birth-date"
              placeholder="Enter Birth Date"
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
                defaultChecked
              />
              <label htmlFor="check-male">Male</label>
            </div>
            <div className="gender">
              <input type="radio" id="check-female" name="gender" />
              <label htmlFor="check-female">Female</label>
            </div>
          </div>
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
          <label htmlFor="parent-email">Parent's Email Address</label>
          <input
            type="email"
            id="parent-email"
            placeholder="Enter Your Parent's Email Address"
            required
          />
        </div>
        <div className="input-box address">
          <label htmlFor="address-line1">Address</label>
          <input
            type="text"
            id="address-line1"
            placeholder="Address line 1"
            required
          />
          <input
            type="text"
            id="address-line2"
            placeholder="Address line 2"
            required
          />
          <div className="column">
            <div className="input-box">
              <label htmlFor="country">Country</label>
              <select id="country" className="select-box">
                <option hidden>Country</option>
                <option>Bangladesh</option>
                <option>India</option>
                <option>America</option>
                <option>Japan</option>
                <option>Malaysia</option>
              </select>
            </div>
            <div className="input-box">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                placeholder="Enter your city"
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="postal-code">Postal Code</label>
              <input
                type="number"
                id="postal-code"
                placeholder="Enter postal code"
                required
              />
            </div>
          </div>
        </div>
        <div className="input-box">
          <label htmlFor="disability-type">Disability Type</label>
          <select id="disability-type" className="select-box">
            <option hidden>Select one-</option>
            <option>Social Communication Disorder (SCD)</option>
            <option>Expressive Language Disorder</option>
            <option>Pragmatic Language Impairment</option>
            <option>Intellectual Disability (ID)</option>
            <option>Attention-Deficit/Hyperactivity Disorder (ADHD)</option>
            <option>Sensory Processing Disorder (SPD)</option>
            <option>Dyspraxia (Developmental Coordination Disorder)</option>
            <option>Generalized Anxiety Disorder (GAD)</option>
            <option>Specific Learning Disorder (SLD)</option>
            <option>Nonverbal Learning Disability (NVLD)</option>
          </select>
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

export default ChildReg;
