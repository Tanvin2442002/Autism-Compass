import React from 'react';
import './therapyORG.css';
import 'boxicons/css/boxicons.min.css';
import Navbar from '../Navbar';


const TherapyOrganizations = () => {
    return (
        <div>
            <div className="wrapper2">
            <Navbar />
                <h1>Therapy Organizations</h1>
                <div className="search-box">
                    <input type="text" placeholder="Search organizations..." required />
                    <i className='bx bx-search'></i>
                </div>
                <div className="details">
                    <h2>Our Partner Organizations</h2>
                    <div className="org-container">
                        <div className="org-box">
                            <h3>Bangladesh ABA Centre for Autism</h3>
                            <p><span className="attribute">Contact No.:</span> +880123456789</p>
                            <p><span className="attribute">Email:</span> info@abacentre.org</p>
                            <p><span className="attribute">City:</span> Dhaka</p>
                            <p><span className="attribute">Street:</span> 123 Autism Lane</p>
                            <p><span className="attribute">Postal Code:</span> 1207</p>
                        </div>
                        <div className="org-box">
                            <h3>Autistic Childrens' Welfare Foundation (ACWF)</h3>
                            <p><span className="attribute">Contact No.:</span> +880987654321</p>
                            <p><span className="attribute">Email:</span> contact@acwf.org</p>
                            <p><span className="attribute">City:</span> Chittagong</p>
                            <p><span className="attribute">Street:</span> 456 Welfare Street</p>
                            <p><span className="attribute">Postal Code:</span> 4100</p>
                        </div>
                        <div className="org-box">
                            <h3>Beautiful Mind</h3>
                            <p><span className="attribute">Contact No.:</span> +880112233445</p>
                            <p><span className="attribute">Email:</span> support@beautifulmind.org</p>
                            <p><span className="attribute">City:</span> Sylhet</p>
                            <p><span className="attribute">Street:</span> 789 Mind Avenue</p>
                            <p><span className="attribute">Postal Code:</span> 3100</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TherapyOrganizations;
