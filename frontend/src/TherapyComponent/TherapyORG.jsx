import React, { useEffect, useState } from 'react';
import './therapyORG.css';
import 'boxicons/css/boxicons.min.css';
import Navbar from '../Navbar';

const TherapyOrganizations = () => {
    const [therapyOrgData, setTherapyOrgData] = useState([]);

    useEffect(() => {
        const fetchTherapyOrgData = async () => {
            try {
                const response = await fetch('http://localhost:5000/therapy/orgdata', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log("Data received");
                console.log(data);
                setTherapyOrgData(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchTherapyOrgData();
    }, []);

    return (
        <div className='therapy-org'>
            <Navbar />
            <div className="therapy-org-content">
                <h1>Therapy Organizations</h1>
                <div className="search-box">
                    <input type="text" placeholder="Search organizations..." required />
                    <i className='bx bx-search'></i>
                </div>
                <div className="details">
                    <h2>Our Partner Organizations</h2>
                    <div className="org-container">
                        {therapyOrgData.map((org) => (
                            <div key={org.ORG_ID} className="org-wrapper">
                                <div className="org-box">
                                    <h3>{org.NAME}</h3>
                                    <p><span className="attribute">Contact No.:</span> {org.CONTACT_NO}</p>
                                    <p><span className="attribute">Email:</span> {org.EMAIL}</p>
                                    <p><span className="attribute">City:</span> {org.CITY}</p>
                                    <p><span className="attribute">Street:</span> {org.STREET}</p>
                                    <p><span className="attribute">Postal Code:</span> {org.POSTAL_CODE}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TherapyOrganizations;
