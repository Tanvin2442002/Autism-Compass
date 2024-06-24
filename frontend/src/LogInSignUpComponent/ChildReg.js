import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const ResetPass = () => {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [showVerifyButton, setShowVerifyButton] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerificationCodeValid, setIsVerificationCodeValid] = useState(false);
    const [isVerificationCodeMatched, setIsVerificationCodeMatched] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordsMatched, setIsPasswordsMatched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (event) => {
        const inputEmail = event.target.value;
        setEmail(inputEmail);

        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);
        setIsEmailValid(isValid);
        setShowVerifyButton(isValid && !verificationSent);
    };

    const handleVerifyClick = () => {
        console.log('Verification code sent');
        setVerificationSent(true);
    };

    const handleVerificationCodeChange = (event) => {
        const code = event.target.value;
        setVerificationCode(code);
        const isValidCode = code.length === 6;
        setIsVerificationCodeValid(isValidCode);
        setIsVerificationCodeMatched(code === '123456'); // Replace with your actual verification logic
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRecoverPassword = () => {
        console.log('Recover password logic');
    };

    return (
        <div className="resetpass">
            <h1>Recover Password</h1>
            <form>
                <label>Email</label>
                <input
                    type="email"
                    id='email'
                    placeholder="Enter your email"
                    className={`input-box-in-resetpass ${email && !isEmailValid ? 'invalid' : (email && isEmailValid ? 'valid' : '')}`}
                    value={email}
                    onChange={handleEmailChange}
                />
                <button
                    className={`VerifyBtn ${verificationSent ? 'sent' : ''}`}
                    onClick={handleVerifyClick}
                    disabled={!showVerifyButton || verificationSent}
                >
                    {verificationSent ? 'Verification code sent' : 'Send verification code'}
                </button>
                {showVerifyButton && verificationSent && (
                    <>
                        <label>Verification Code</label>
                        <input
                            type="text"
                            id='verificationCode'
                            placeholder="Enter the verification Code"
                            className={`input-box-in-resetpass ${verificationCode && !isVerificationCodeValid ? 'invalid' : (verificationCode && isVerificationCodeValid ? 'valid' : '')}`}
                            value={verificationCode}
                            onChange={handleVerificationCodeChange}
                        />
                    </>
                )}
                {isVerificationCodeMatched && (
                    <>
                        <label>New Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='Password'
                                placeholder="Enter new Password"
                                className={`input-box-in-resetpass ${newPassword && !isPasswordsMatched ? 'invalid' : (newPassword && isPasswordsMatched ? 'valid' : '')}`}
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="password-toggle-icon"
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        <label>Confirm New Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='confirmPassword'
                                placeholder="Enter Confirm New Password"
                                className={`input-box-in-resetpass ${confirmPassword && !isPasswordsMatched ? 'invalid' : (confirmPassword && isPasswordsMatched ? 'valid' : '')}`}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="password-toggle-icon"
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        {isPasswordsMatched && (
                            <button className="recoverpassBtn" onClick={handleRecoverPassword}>Recover Password</button>
                        )}
                    </>
                )}
            </form>
        </div>
    );
};

export default ResetPass;
