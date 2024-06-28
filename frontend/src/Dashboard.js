import React from "react";
import { Link } from "react-router-dom";


const Dashboard = () => {
    return (
        <div>
            <h1>This is Dashboard Page</h1>
            <Link to="/profile">Go to Profile</Link>
        </div>
    );
};

export default Dashboard;