import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Registration.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChildReg = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleShowPassword = () => { setShowPassword(!showPassword); };
    const toggleShowConfirmPassword = () => { setShowConfirmPassword(!showConfirmPassword); };


    const handleChildRegForm = async (e) => {
        e.preventDefault();

        const childData = {
            C_ID: Math.floor(Math.random() * 1000),
            NAME: document.getElementById("full-name").value,
            DOB: document.getElementById("birth-date").value,
            EMAIL: document.getElementById("email").value,
            CONTACT_NO: document.getElementById("phone").value,
            P_EMAIL: document.getElementById("parent-email").value,
            CITY: document.getElementById("city").value,
            STREET: document.getElementById("street").value,
            POSTAL_CODE: document.getElementById("postal-code").value,
            PASSWORD: document.getElementById("password").value,
            CONFIRM_PASSWORD: document.getElementById("confirm-password").value,
        };
        if (childData.PASSWORD !== childData.CONFIRM_PASSWORD) {
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
        console.log(childData);
        const response = await fetch('http://localhost:5000/reg/child', {
            method: "POST",
            body: JSON.stringify(childData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let data = await response.json();
        console.log(data);
        localStorage.setItem("child", childData.C_ID);
        navigate('/dashboard');
    };

    return (
        <section className="container">
            <ToastContainer />
            <header>Child Registration Form</header>
            <form onSubmit={handleChildRegForm} className="form">
                <div className="input-box">
                    <label htmlFor="full-name">Full Name</label>
                    <input
                        type="text"
                        id="full-name"
                        placeholder="Enter Full Name"
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
                <div className="input-box">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter Email Address"
                        required
                    />
                </div>
                {/* <div className="gender-box">
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
        </div> */}
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
                    {/* <input
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
          /> */}
                    <div className="column">
                        {/* <div className="input-box">
              <label htmlFor="country">Country</label>
              <select id="country" className="select-box">
                <option hidden>Country</option>
                <option>Bangladesh</option>
                <option>India</option>
                <option>America</option>
                <option>Japan</option>
                <option>Malaysia</option>
              </select>
            </div> */}
                        <div className="input-box">
                            <label htmlFor="street">Street</label>
                            <input
                                type="text"
                                id="street"
                                placeholder="Enter your street"
                                required
                            />
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
                    <label>Password</label>
                    <div className="password-container">
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
                <div className="input-box">
                    <label>Confirm Password</label>
                    <div className="password-container">
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
                <button type="submit">Submit</button>
            </form>
        </section>
    );
};

export default ChildReg;