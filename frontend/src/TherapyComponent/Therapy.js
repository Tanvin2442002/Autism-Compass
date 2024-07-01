import React from 'react';
import './availableTherapy.css';
// import 'boxicons/css/boxicons.min.css';

const AvailableTherapies = () => {
    return (
        <div className="container">
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <div className="wrapper">
                <h1>Available Therapies</h1>
                <div className="search-box">
                    <input type="text" placeholder="Search therapies..." required />
                    <i className='bx bx-search'></i>
                </div>
                <div className="therapy-list">
                    <div className="therapy-item">
                        <h2>Applied Behavior Analysis (ABA)</h2>
                        <p>Behavioral therapy focusing on positive reinforcement.</p>
                        <button className="btn">View Details</button>
                    </div>
                    <div className="therapy-item">
                        <h2>Social Skills Training</h2>
                        <p>Enhances interaction abilities with peers.</p>
                        <button className="btn">View Details</button>
                    </div>
                    <div className="therapy-item">
                        <h2>Speech Therapy</h2>
                        <p> Improves communication skills.</p>
                        <button className="btn">View Details</button>
                    </div>
                    {/* Add more therapy items as needed */}
                    <div className="therapy-item">
                        <h2>Sensory Integration Therapy</h2>
                        <p>Addresses sensory processing difficulties.</p>
                        <button className="btn">View Details</button>
                    </div>
                    <div className="therapy-item">
                        <h2>Visual Supports Therapy</h2>
                        <p>Uses visual aids to enhance communication and understanding.</p>
                        <button className="btn">View Details</button>
                    </div>
                    <div className="therapy-item">
                        <h2>Developmental Therapy</h2>
                        <p>Focuses on overall development and learning skills.</p>
                        <button className="btn">View Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailableTherapies;
