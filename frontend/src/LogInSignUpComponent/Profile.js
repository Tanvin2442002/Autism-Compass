import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
    const [Data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userDataString = localStorage.getItem('USER');
            console.log(userDataString);
            if (!userDataString) {
                setError('USER not found in local storage');
                setLoading(false);
                return;
            }

            const userData = JSON.parse(userDataString);

            try {
                const response = await fetch('http://localhost:5000/reg/user-info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ID: userData.ID, TYPE: userData.TYPE })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setData(data[0]); // Assuming the response is an array of user objects
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="user-info">
            <h1>User Information</h1>
            {Data && (
                <>
                    <div className="user-info-item"><strong>Name:</strong> {Data.NAME}</div>
                    <div className="user-info-item"><strong>Date of Birth:</strong> {Data.DOB}</div>
                    <div className="user-info-item"><strong>Contact Number:</strong> {Data.CONTACT_NO}</div>
                    <div className="user-info-item"><strong>Email:</strong> {Data.EMAIL}</div>
                    <div className="user-info-item"><strong>Personal Email:</strong> {Data.P_EMAIL}</div>
                    <div className="user-info-item"><strong>City:</strong> {Data.CITY}</div>
                    <div className="user-info-item"><strong>Street:</strong> {Data.STREET}</div>
                    <div className="user-info-item"><strong>Postal Code:</strong> {Data.POSTAL_CODE}</div>
                </>
            )}
        </div>
    );
};

export default Profile;
