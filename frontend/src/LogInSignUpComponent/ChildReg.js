import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Registration.css";

const ChildReg = () => {
   const navigate = useNavigate();

   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const toggleShowPassword = () => { setShowPassword(!showPassword); };
   const toggleShowConfirmPassword = () => { setShowConfirmPassword(!showConfirmPassword); };


   const handleChildRegForm = async (e) => {
      e.preventDefault();

      const childData = {
         C_ID: (Math.floor(Math.random() * 100)),
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
         DISORDER_TYPE: document.getElementById("disability-type").value,
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

      if (data.message === "Child Registered Successfully") {
         navigate('/login');
      } else {
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
               <div className="column">
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
                  <option>Expressive Language Disorder (ELD)</option>
                  <option>Pragmatic Language Impairment Disorder (PLID)</option>
                  <option>Intellectual Disability (ID)</option>
                  <option>Attention-Deficit/Hyperactivity Disorder (ADHD)</option>
                  <option>Sensory Processing Disorder (SPD)</option>
                  <option>Developmental Coordination Disorder (DCD)</option>
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



