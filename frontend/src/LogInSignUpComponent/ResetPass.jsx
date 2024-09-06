import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import emailjs from '@emailjs/browser'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const ResetPass = () => {
   const navigate = useNavigate();
   const [email, setEmail] = useState('');
   const [isEmailValid, setIsEmailValid] = useState(false);
   const [showVerifyButton, setShowVerifyButton] = useState(false);
   const [verificationSent, setVerificationSent] = useState(false);
   const [generatedVerificationCode, setGeneratedVerificationCode] = useState('');
   const [enteredVerificationCode, setEnteredVerificationCode] = useState('');
   const [isVerificationCodeMatched, setIsVerificationCodeMatched] = useState(false);
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [isPasswordsMatched, setIsPasswordsMatched] = useState(false);
   const [showNewPassword, setShowNewPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const checkEmailInDatabase = async (inputEmail) => {
      try {
         const response = await fetch('http://localhost:5000/reg/check-email', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ EMAIL: inputEmail }),
         });
         const data = await response.json();
         return data.valid;
      } catch (error) {
         console.error('Error checking email:', error);
         return false;
      }
   };

   const handleEmailChange = async (event) => {
      const inputEmail = event.target.value;
      setEmail(inputEmail);

      if (inputEmail) {
         const isValid = await checkEmailInDatabase(inputEmail);
         setIsEmailValid(isValid);
         setShowVerifyButton(isValid && !verificationSent);
      } else {
         setIsEmailValid(false);
         setShowVerifyButton(false);
      }
   };

   const generateVerificationCode = () => {
      return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
   };

   const handleSendVerificationCode = async (e) => {
      e.preventDefault();
      const code = generateVerificationCode().toString();
      setGeneratedVerificationCode(code); // Store the generated code

      const templateParams = {
         to_email: email,
         verification_code: code,
      };

      emailjs.send(
         'service_7d9d58s',
         'template_zm1cokb',
         templateParams,
         '_8DUdddBxrHErN9_P'
      )
         .then(
            () => {
               console.log('Verification code sent successfully!');
               setVerificationSent(true);
            },
            (error) => {
               console.log('Failed to send verification code...', error.text);
            }
         );
      toast.success('Verification code sent!', {
         position: "top-right",
         autoClose: 2500,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: false,
         draggable: true,
         progress: undefined,
         theme: "light",
      });
      console.log('Verification code sent');
      console.log(code);


      setVerificationSent(true);
   };

   const handleVerificationCodeChange = (event) => {
      const code = event.target.value;
      setEnteredVerificationCode(code);
      setIsVerificationCodeMatched(code === generatedVerificationCode);
   };

   const handleNewPasswordChange = (event) => {
      const password = event.target.value;
      setNewPassword(password);
      setIsPasswordsMatched(password && password === confirmPassword);
   };

   const handleConfirmPasswordChange = (event) => {
      const password = event.target.value;
      setConfirmPassword(password);
      setIsPasswordsMatched(password && password === newPassword);
   };

   const toggleNewPasswordVisibility = () => {
      setShowNewPassword(!showNewPassword);
   };

   const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
   };

   const handleRecoverPassword = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch('http://localhost:5000/reg/update-password', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ EMAIL: email, PASSWORD: newPassword }),
         });

         const data = await response.json();
      } catch (error) {
         console.error('Error checking:', error);
      }
      console.log('Password Recovered Successfully!');
      navigate('/login');

   };

   return (
      <div className="resetpass">
         <form>
            <h1>Recover Password</h1>
            <div className='res-pass-div'>
               <label>Email</label>
               <input
                  type="email"
                  id='email'
                  name='email'
                  placeholder="Enter your email"
                  className={`input-box-in-resetpass ${email && !isEmailValid ? 'invalid' : (email && isEmailValid ? 'valid' : '')}`}
                  value={email}
                  onChange={handleEmailChange}
                  disabled={verificationSent}
                  style={{ opacity: verificationSent ? 0.5 : 1 }}
               />
               <button
                  className={`VerifyBtn ${verificationSent ? 'sent' : ''}`}
                  onClick={handleSendVerificationCode}
                  disabled={!showVerifyButton || verificationSent}
                  style={{ opacity: verificationSent ? 0.5 : 1 }}
               >
                  {verificationSent ? 'Verification code sent' : 'Send verification code'}
               </button>
            </div>
            {showVerifyButton && verificationSent && (
               <div className='res-pass-div'>
                  <label>Verification Code</label>
                  <input
                     type="text"
                     id='verificationCode'
                     placeholder="Enter the verification Code"
                     className={`input-box-in-resetpass ${enteredVerificationCode && !isVerificationCodeMatched ? 'invalid' : (enteredVerificationCode && isVerificationCodeMatched ? 'valid' : '')}`}
                     value={enteredVerificationCode}
                     onChange={handleVerificationCodeChange}
                     disabled={isVerificationCodeMatched}
                     style={{ opacity: isVerificationCodeMatched ? 0.5 : 1 }}
                  />
               </div>
            )}
            {isVerificationCodeMatched && (
               <div className='res-pass-div'>
                  <label>New Password</label>
                  <div className="password-input-container">
                     <input
                        type={showNewPassword ? 'text' : 'password'}
                        id='Password'
                        placeholder="Enter new Password"
                        className={`input-box-in-resetpass ${newPassword && !isPasswordsMatched ? 'invalid' : (newPassword && isPasswordsMatched ? 'valid' : '')}`}
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                     />
                     <FontAwesomeIcon
                        icon={showNewPassword ? faEyeSlash : faEye}
                        className="password-toggle-icon"
                        onClick={toggleNewPasswordVisibility}
                     />
                  </div>
                  <label>Confirm New Password</label>
                  <div className="password-input-container">
                     <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id='confirmPassword'
                        placeholder="Enter Confirm New Password"
                        className={`input-box-in-resetpass ${confirmPassword && !isPasswordsMatched ? 'invalid' : (confirmPassword && isPasswordsMatched ? 'valid' : '')}`}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                     />
                     <FontAwesomeIcon
                        icon={showConfirmPassword ? faEyeSlash : faEye}
                        className="password-toggle-icon"
                        onClick={toggleConfirmPasswordVisibility}
                     />
                  </div>
                  {isPasswordsMatched && (
                     <button className="recoverpassBtn" onClick={handleRecoverPassword}>Recover Password</button>
                  )}
               </div>
            )}
         </form>
         <ToastContainer />
      </div>
   );
};

export default ResetPass;
