import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";

const LogIn = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [userType, setUserType] = React.useState("");
    const [rememberMe, setRememberMe] = React.useState(false);
    const navigate = useNavigate();

    const handleLogIn = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            body: JSON.stringify({ email, password, type: userType.toUpperCase() }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        // console.log(`Email: ${email}, Password: ${password}, Type: ${userType.toUpperCase()}`);
        const data = await response.json();
        // console.log(data);
        let ID = "";
        if (data.TYPE === "CHILD") {
            ID = data.C_ID;
        } else if (data.TYPE === "PARENT") {
            ID = data.P_ID;
        } else if (data.TYPE === "HEALTH_PROFESSIONAL") {
            ID = data.H_ID;
        } else if (data.TYPE === "TEACHER") {
            ID = data.T_ID;
        }
        console.log('ID: ', ID);
        let userData = {
            ID: ID,
            TYPE: data.TYPE,
        };
        if (data.TYPE) {
            console.log(userData);
            // Redirect to the dashboard
            navigate("/dashboard");
            localStorage.setItem("USER", JSON.stringify(userData));
        } else {
            console.log("Invalid credentials");
            toast.error('Invalid credentials', {
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
        <>
            <div className="wrapper">
                <form onSubmit={handleLogIn}>
                    <h1>WELCOME!</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <div className="input-box">
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Who is logging in?
                            </option>
                            <option value="child">Child</option>
                            <option value="parent">Parent</option>
                            <option value="teacher">Teacher</option>
                            <option value="Health_professional">Health_professional</option>
                        </select>
                        <i className="bx bxs-down-arrow"></i>
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            Remember me
                        </label>
                        <Link to='/reset-password'> Forgot Password</Link>
                    </div>
                    <button type="submit" className="btn">
                        LOGIN
                    </button>
                    <div className="register-link">
                        <p>
                            Don't have an account? <Link to="/">Register</Link>
                        </p>
                    </div>
                </form>
            </div>
            <ToastContainer/>

        </>
    );
};

export default LogIn;
