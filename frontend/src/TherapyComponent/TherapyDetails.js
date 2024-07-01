import React from 'react';
import './TherapyDetails.css';
import 'boxicons/css/boxicons.min.css';

const TherapyDetails = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <div className="twrapper">
                <h1>Therapy Details</h1>
                <div className="search-box">
                    <input type="text" placeholder="Search therapies..." required />
                    <i className='bx bx-search'></i>
                </div>
                <div className="details">
                    <h2>Name: Applied Behavior Analysis (ABA)</h2>
                    <p>
                        Applied Behavior Analysis (ABA) therapy helps autistic children by enhancing their social, communication, and learning skills through positive reinforcement. It is applied using structured techniques tailored to each child's unique needs, focusing on reinforcing desirable behaviors and reducing challenging ones. ABA therapy involves consistent, data-driven approaches to foster independence and improve overall quality of life. Therapists work one-on-one or in group sessions, using rewards to motivate and encourage progress. By breaking down complex tasks into manageable steps, ABA therapy makes learning more accessible and effective. Continuous monitoring and adjustment ensure the therapy remains effective, promoting meaningful development. Overall, ABA therapy supports autistic children in achieving their fullest potential.
                    </p>
                </div>
                <div className="availability">
                    <h3>Currently available in:</h3>
                    <div className="org-container">
                        <div className="org-wrapper">
                            <div className="org-box">
                                <p>Bangladesh ABA Centre for Autism</p>
                            </div>
                            <button className="book-now">Book now</button>
                        </div>
                        <div className="org-wrapper">
                            <div className="org-box">
                                <p>Autistic Childrens' Welfare Foundation (ACWF)</p>
                            </div>
                            <button className="book-now">Book now</button>
                        </div>
                        <div className="org-wrapper">
                            <div className="org-box">
                                <p>Beautiful Mind</p>
                            </div>
                            <button className="book-now">Book now</button>
                        </div>
                    </div>
                </div>
                <button className="btn">Back</button>
            </div>
        </div>
    );
};

export default TherapyDetails;
