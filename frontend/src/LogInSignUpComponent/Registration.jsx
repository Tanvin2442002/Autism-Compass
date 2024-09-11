import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, useToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Registration.css';
import SignUpImg from '../img/SignUp.svg'
import { motion } from 'framer-motion';
import RevealLeftToRight from '../RevealLeftToRight';

const Registration = () => {
   const navigate = useNavigate();
   const [userType, setUserType] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const toggleShowPassword = () => { setShowPassword(!showPassword); };
   const toggleShowConfirmPassword = () => { setShowConfirmPassword(!showConfirmPassword); };

   const [showLoader, setShowLoader] = useState(false);

   useEffect(() => {

   }, []);
   const handleRegistrationForm = async (e) => {
      setShowLoader(true);
      e.preventDefault();
      const pass = {
         PASSWORD: document.getElementById("password").value,
         CONFIRM_PASSWORD: document.getElementById("confirm-password").value,
      }
      if (pass.PASSWORD !== pass.CONFIRM_PASSWORD) {
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
      if (userType === 'PARENT') {

         const parentData = {
            P_ID: Math.floor(Math.random() * 1000),
            NAME: document.getElementById("name").value,
            DOB: document.getElementById("dob").value,
            EMAIL: document.getElementById("email").value,
            CONTACT_NO: document.getElementById("contact-no").value,
            CITY: document.getElementById("city").value,
            STREET: document.getElementById("street").value,
            POSTAL_CODE: document.getElementById("postal-code").value,
            PASSWORD: document.getElementById("password").value,
            CONFIRM_PASSWORD: document.getElementById("confirm-password").value,
         };
         console.log(parentData);
         const response = await fetch("http://localhost:5000/reg/parent", {
            method: "POST",
            body: JSON.stringify(parentData),
            headers: {
               "Content-Type": "application/json",
            },
         });
         let data = await response.json();
         setTimeout(() => {
            console.log(data);
            if (data.message === "Parent registered successfully!") {
               navigate("/login");
            }
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
            setShowLoader(false);
         }, 1000);
      }
      else if (userType === 'CHILD') {
         const childData = {
            C_ID: Math.floor(Math.random() * 1000),
            NAME: document.getElementById("name").value,
            DOB: document.getElementById("dob").value,
            EMAIL: document.getElementById("email").value,
            CONTACT_NO: document.getElementById("contact-no").value,
            P_EMAIL: document.getElementById("parent-email").value,
            CITY: document.getElementById("city").value,
            STREET: document.getElementById("street").value,
            POSTAL_CODE: document.getElementById("postal-code").value,
            PASSWORD: document.getElementById("password").value,
            CONFIRM_PASSWORD: document.getElementById("confirm-password").value,
            DISORDER_TYPE: document.getElementById("disability-type").value,
         };
         console.log(childData);
         const response = await fetch("http://localhost:5000/reg/child", {
            method: "POST",
            body: JSON.stringify(childData),
            headers: {
               "Content-Type": "application/json",
            },
         });
         let data = await response.json();
         console.log(data);
         setTimeout(() => {
            console.log(data.message);
            if (data.message === "Child registered successfully!") {
               navigate("/login");
            } else if (data.message === "Parent not found") {
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
            setShowLoader(false);
         }, 1000);
      }
      else if (userType === 'DOCTOR') {
         const startTime = document.getElementById("start-visit-time").value;
         const endTime = document.getElementById("end-visit-time").value;
         console.log(startTime, endTime);
         const visitTime = startTime + " - " + endTime;
         console.log(visitTime);
         const doctorData = {
            H_ID: Math.floor(Math.random() * 1000),
            NAME: document.getElementById("name").value,
            EMAIL: document.getElementById("email").value,
            CONTACT_NO: document.getElementById("contact-no").value,
            DEGREE: document.getElementById("degree").value,
            FIELD_OF_SPEC: document.getElementById("spec").value,
            NAME_OF_HOSPITAL: document.getElementById("hospital").value,
            VISIT_TIME: visitTime,
            CITY: document.getElementById("city").value,
            STREET: document.getElementById("street").value,
            POSTAL_CODE: document.getElementById("postal-code").value,
            PASSWORD: document.getElementById("password").value,
            CONFIRM_PASSWORD: document.getElementById("confirm-password").value,
         };
         console.log(doctorData);
         const response = await fetch("http://localhost:5000/reg/doctor", {
            method: "POST",
            body: JSON.stringify(doctorData),
            headers: {
               "Content-Type": "application/json",
            },
         });
         const data = await response.json();
         setTimeout(() => {
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
            setShowLoader(false);
         }, 1000);
      }
      else if (userType === 'TEACHER') {
         const teacherData = {
            T_ID: Math.floor(Math.random() * 1000),
            NAME: document.getElementById("name").value,
            EMAIL: document.getElementById("email").value,
            CONTACT_NO: document.getElementById("contact-no").value,
            INSTITUTION: document.getElementById("institution").value,
            PASSWORD: document.getElementById("password").value,
            CONFIRM_PASSWORD: document.getElementById("confirm-password").value,
         };
         console.log(teacherData);
         const response = await fetch("http://localhost:5000/reg/teacher", {
            method: "POST",
            body: JSON.stringify(teacherData),
            headers: {
               "Content-Type": "application/json",
            },
         });
         let data = await response.json();
         setTimeout(() => {
            console.log(data);
            if (data.message === "Teacher registered successfully!") {
               navigate("/login");
            }
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
            setShowLoader(false);
         }, 1000);
      }
   };
   console.log(userType);

   return (
      <div>
         <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
         </ul>
         <div className="sign-up-page">
            <RevealLeftToRight>
               <form className="sign-up-form" onSubmit={handleRegistrationForm}>
                  <h1>Fill up the details</h1>
                  <div className="sign-up-in-feild">
                     <label>Name</label>
                     <span>:</span>
                     <input
                        type="text"
                        placeholder="example"
                        id="name"
                        required
                     />
                  </div>
                  <div className="sign-up-in-feild">
                     <label>Contact No</label>
                     <span>:</span>
                     <input
                        type="number"
                        placeholder="01XXXXXXXXX"
                        id="contact-no"
                        required
                     />
                  </div>
                  <div className="sign-up-in-feild">
                     <label>Email</label>
                     <span>:</span>
                     <input
                        type="email"
                        placeholder="example@test.com"
                        id="email"
                        required
                     />
                  </div>
                  <div className="sign-up-in-feild">
                     <label>User Type</label>
                     <span>:</span>
                     <select
                        placeholder='Your type'
                        onChange={(e) => setUserType(e.target.value)}
                        required
                     >
                        <option hidden>Select your type: </option>
                        <option value="CHILD">CHILD</option>
                        <option value="PARENT">PARENT</option>
                        <option value="DOCTOR">DOCTOR</option>
                        <option value="TEACHER">TEACHER</option>
                     </select>
                  </div>
                  {(userType === 'CHILD' || userType === 'PARENT') && (
                     <div className="sign-up-in-feild">
                        <label>Date of Birth</label>
                        <span>:</span>
                        <input
                           type="date"
                           id="dob"
                           placeholder="01/01/2001"
                           required
                        />
                     </div>
                  )}
                  {userType === 'CHILD' && (
                     <>
                        <div className="sign-up-in-feild">
                           <label>Parent Email</label>
                           <span>:</span>
                           <input
                              type="email"
                              placeholder="example@test.com"
                              id="parent-email"
                              required
                           />
                        </div>
                        <div className="sign-up-in-feild">
                           <label>Disability Type</label>
                           <span>:</span>
                           <select id="disability-type" >
                              <option hidden>Select disorder type: </option>
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
                     </>
                  )}
                  {(userType === "CHILD" || userType === "PARENT" || userType === "DOCTOR") && (
                     <div className="address">
                        <label className="add">Address</label>
                        <span>:</span>
                        <div className="add-info">
                           <label>Street</label>
                           <input
                              id="street"
                              type="text"
                              placeholder="Savar"
                              required
                           />
                        </div>
                        <div className="add-info">
                           <label>City</label>
                           <input
                              id="city"
                              type="text"
                              placeholder="Dhaka"
                              required
                           />
                        </div>
                        <div className="add-info">
                           <label>Postal Code</label>
                           <input
                              id="postal-code"
                              type="number"
                              placeholder="1230"
                              required
                           />
                        </div>
                     </div>
                  )}
                  {userType === 'DOCTOR' && (
                     <>
                        <div className="sign-up-in-feild">
                           <label>Degree</label>
                           <span>:</span>
                           <input
                              id="degree"
                              type="text"
                              placeholder="Eye"
                              required
                           />
                        </div>
                        <div className="sign-up-in-feild">
                           <label>Feild of Spec.</label>
                           <span>:</span>
                           <input
                              id="spec"
                              type="text"
                              placeholder="Eye"
                              required
                           />
                        </div>
                        <div className="sign-up-in-feild">
                           <label>Hospital</label>
                           <span>:</span>
                           <input
                              id="hospital"
                              type="text"
                              placeholder="CMH, Savar Cantonment"
                              required
                           />
                        </div>
                        <div className="sign-up-in-feild">
                           <label>Start Visit Time</label>
                           <span>:</span>
                           <input
                              id="start-visit-time"
                              type="time"
                              placeholder="10AM - 2PM"
                              required
                           />
                        </div>
                        <div className="sign-up-in-feild">
                           <label>End Visit Time</label>
                           <span>:</span>
                           <input
                              id="end-visit-time"
                              type="time"
                              placeholder="10AM - 2PM"
                              required
                           />
                        </div>
                     </>
                  )}
                  {userType === 'TEACHER' && (
                     <div className="sign-up-in-feild">
                        <label>Institution</label>
                        <span>:</span>
                        <input
                           id='institution'
                           type="text"
                           placeholder="MIST"
                           required
                        />
                     </div>
                  )}
                  <div className="sign-up-in-feild">
                     <label>Password</label>
                     <span>:</span>
                     <input
                        id="password"
                        type="text"
                        placeholder="***"
                        required
                     />
                  </div>
                  <div className="sign-up-in-feild">
                     <label>Confirm Password</label>
                     <span>:</span>
                     <input
                        id="confirm-password"
                        type="text"
                        placeholder="***"
                        required
                     />
                  </div>
                  {showLoader &&
                     <div className='loader-div'>
                        <div className='loader-animation'></div>
                     </div>
                  }
                  {!showLoader && <button className='view-more-button'> SIGN UP</button>}
               </form>
            </RevealLeftToRight>

            <motion.div className="sign-up-image"
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                     type: "spring",
                     damping: 5,
                     stiffness: 100,
                     restDelta: 0.001
                  }
               }}
            >
               <img src={SignUpImg} alt="Sign Up Image" />
            </motion.div>
         </div>
         <ToastContainer />
      </div>
   );
};

export default Registration;
