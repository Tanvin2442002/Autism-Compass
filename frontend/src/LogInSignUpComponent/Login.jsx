import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'boxicons/css/boxicons.min.css';
import { easeInOut, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogInImage from '../img/LogIn.svg';
import Reveal from '../RevealRightToLeft';
import './Login.css';

const LogIn = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [userType, setUserType] = useState("");
   const [rememberMe, setRememberMe] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const navigate = useNavigate();
   const [showLoader, setShowLoader] = useState(false);

   useEffect(() => {
      document.body.classList.add('login-body');
      return () => {
         document.body.classList.remove('login-body');
      };
   }, []);

   const handleLogIn = async (e) => {
      setShowLoader(true);
      e.preventDefault();
      const response = await fetch("http://localhost:5000/login", {
         method: "POST",
         body: JSON.stringify({ email, password, type: userType.toUpperCase() }),
         headers: {
            "Content-Type": "application/json",
         },
      });
      const data = await response.json();
      console.log(data);
      let ID = "";
      // if (data.TYPE === "CHILD") {
      //    ID = data.C_ID;
      // } else if (data.TYPE === "PARENT") {
      //    ID = data.P_ID;
      // } else if (data.TYPE === "HEALTH_PROFESSIONAL") {
      //    ID = data.H_ID;
      // } else if (data.TYPE === "TEACHER") {
      //    ID = data.T_ID;
      // }
      let userData = {
         ID: data.ID,
         TYPE: data.TYPE,
      };
      console.log(userData);
      setTimeout(() => {
         if (data.TYPE) {
            // navigate("/dashboard");
            localStorage.setItem("USER", JSON.stringify(userData));
            if (rememberMe) {
               localStorage.setItem("REMEMBER_ME", "1");
            } else {
               localStorage.setItem("REMEMBER_ME", "0");
            }
            if(data.TYPE === 'TEACHER'){
               navigate("/courses");
            }
            else{
               navigate("/dashboard");
            }
         } else {
            toast.error('Invalid credentials', {
               position: "top-right",
               autoClose: 2000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: true,
               progress: undefined,
               theme: "colored",
            });
         }
         setShowLoader(false);
      }, 1000);
   };

   return (
      <div className='login-div'>
         <ul className="circles">
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
         <div className='login-contents'>
            <Reveal>
               <form onSubmit={handleLogIn} className="login-wrapper">
                  <h1>WELCOME!</h1>
                  <div className="profile-form-group">
                     <label>Username</label>
                     <span>:</span>
                     <input
                        type="email"
                        name="username"
                        placeholder="example@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                     />
                  </div>
                  <div className="profile-form-group password-input">
                     <label>Password</label>
                     <span>:</span>
                     <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                     />
                     <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                     </span>
                  </div>
                  <div className="profile-form-group">
                     <label>Your Type</label>
                     <span>:</span>
                     <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        required
                     >
                        <option value="" disabled>
                           Who is logging in?
                        </option>
                        <option value="child">CHILD</option>
                        <option value="parent">PARENT</option>
                        <option value="Health_professional">DOCTOR</option>
                        <option value="teacher">TEACHER</option>
                     </select>
                  </div>

                  <div className="login-remember-forgot">
                     <label className='login-text'>
                        <input
                           type="checkbox"
                           checked={rememberMe}
                           onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Remember me
                     </label>
                     <Link to="/reset-password" className='link-to-reg'>Forgot Password?</Link>
                  </div>
                  {showLoader &&
                     <div className='loader-div'>
                        <div className='loader-animation'></div>
                     </div>
                  }
                  {!showLoader && <button className='view-more-button'> LOG IN</button>}
                  <div className="login-register-link">
                     <p className='login-text'>
                        Don't have an account? <Link to="/signup" className='link-to-reg'>Register</Link>
                     </p>
                  </div>
               </form>
            </Reveal>
            <motion.img src={LogInImage} alt='Image' className='login-img'
               variants={{
                  hidden: { opacity: 0, x: -100 },
                  visible: { opacity: 1, x: 0 }
               }}
               initial="hidden"
               animate="visible"
               transition={{ease:easeInOut, duration: 0.5, delay: 0.25 }}  
            />
         </div>
         <ToastContainer />
      </div>
   );
};

export default LogIn;
