import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Registration.css';

const ParentReg = () => {
   const navigate = useNavigate();

   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const toggleShowPassword = () => { setShowPassword(!showPassword); };
   const toggleShowConfirmPassword = () => { setShowConfirmPassword(!showConfirmPassword); };

   const handleParentRegForm = async (e) => {
      e.preventDefault();
      const parentData = {
         P_ID: Math.floor(Math.random() * 1000),
         NAME: document.getElementById("full-name").value,
         DOB: document.getElementById("birth-date").value,
         EMAIL: document.getElementById("email").value,
         CONTACT_NO: document.getElementById("phone").value,
         CITY: document.getElementById("city").value,
         STREET: document.getElementById("street").value,
         POSTAL_CODE: document.getElementById("postal-code").value,
         PASSWORD: document.getElementById("password").value,
         CONFIRM_PASSWORD: document.getElementById("confirm-password").value,
      };
      console.log(parentData);
      if (parentData.PASSWORD !== parentData.CONFIRM_PASSWORD) {
         console.log("Passwords do not match");
         toast.error("Passwords do not match!", {
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
      const response = await fetch("http://localhost:5000/reg/parent", {
         method: "POST",
         body: JSON.stringify(parentData),
         headers: {
            "Content-Type": "application/json",
         },
      });
      let data = await response.json();
      console.log(data);
      navigate("/login");
   };

   return (
      <div className="registration-contents">
         <section className="registration-section">
            <ToastContainer />
            <div className="registration-main-part">
               <header>Parent Registration Form</header>
               <form onSubmit={handleParentRegForm} className="registration-form">
                  <div className="registration-input-box">
                     <label>Full Name</label>
                     <input
                        type="text"
                        name="fullName"
                        placeholder="Enter Full Name"
                        id="full-name"
                        required
                     />
                  </div>
                  <div className="registration-input-box">
                     <label>Email Address</label>
                     <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Enter Email Address"
                        required
                     />
                  </div>
                  <div className="registration-input-box">
                     <label>Birth Date</label>
                     <input
                        type="date"
                        name="birthDate"
                        id="birth-date"
                        required
                     />
                  </div>
                  <div className="registration-input-box">
                     <label>Phone Number</label>
                     <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Enter Phone Number"
                        id="phone"
                        required
                     />
                  </div>
                  <div className="registration-address">
                     <div className="registration-input-box">
                        <label htmlFor="street">Street</label>
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
                           name="city"
                           placeholder="Enter your city"
                           id="city"
                           required
                        />
                     </div>
                     <div className="registration-input-box">
                        <label>Postal Code</label>
                        <input
                           type="text"
                           name="postalCode"
                           placeholder="Enter postal code"
                           id="postal-code"
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

export default ParentReg;
