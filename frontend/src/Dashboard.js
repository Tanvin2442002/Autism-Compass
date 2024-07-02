import React from 'react';
// import './Dashboard.css'; // Ensure to create and use this CSS file
import Navbar from './Navbar';



const Dashboard = () => {
    return (

        <div className="dashboard">
            <header className="upper">
                <h1>AUTISM COMPASS</h1>
            </header>
            <Navbar />
        </div>
    );
};

export default Dashboard;
