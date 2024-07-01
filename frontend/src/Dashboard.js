import React from "react";
import { Link } from "react-router-dom";


const Dashboard = () => {
    return (
        <div>
            <h1>This is Dashboard Page</h1>
            <Link to="/profile">Go to Profile</Link>
            <Link to="/therapy">Go to Therapy</Link>
            <Link to="/therapy/details">Details</Link>
            <Link to='/therapy/org'>Organizations</Link>
        </div>
    );
};

export default Dashboard;