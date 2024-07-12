import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import './DoctorProfile.css';

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      console.log("Fetching doctor details for ID:", id); // Debugging log
      try {
        const response = await fetch(`http://localhost:5000/doctor/detail?id=${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched doctor data:", data); // Debugging log
        setDoctor(data[0]);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching doctor details:", err); // Debugging log
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleBooking = () => {
    setIsBooked(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-background">
      <Navbar />
      <div className="wrapper">
        <div className="search-box">
          <input type="text" placeholder="Search doctors..." required />
          <i className='bx bx-search'></i>
        </div>
        <h1>Doctor's Profile</h1>
        {doctor && (
          <div className="profile-container">
            <img src={`https://avataaars.io/?avatarStyle=Circle&topType=${doctor.GENDER === 'male' ? 'ShortHairShortCurly' : 'LongHairStraight'}&accessoriesType=Blank&hairColor=${doctor.GENDER === 'male' ? 'Brown' : 'Blonde'}&facialHairType=Blank&clotheType=Doctor&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light`} alt="Profile" className="profile-avatar" />
            <h2 className="doctor-name">Dr. {doctor.NAME}</h2>
            <div className="info-group">
              <p className="attribute">Field of Specialization:</p>
              <div className="info-box slide-in">{doctor.FEILD_0F_SPEC}</div>
            </div>
            <div className="info-group">
              <p className="attribute">Degree:</p>
              <div className="info-box slide-in">{doctor.DEGREE}</div>
            </div>
            <div className="info-group">
              <p className="attribute">Contact No.:</p>
              <div className="info-box slide-in">{doctor.CONTACT_NO}</div>
            </div>
            <div className="info-group">
              <p className="attribute">Email:</p>
              <div className="info-box slide-in">{doctor.EMAIL}</div>
            </div>
            <button 
              className={`book-now-button ${isBooked ? 'booked' : ''}`} 
              onClick={handleBooking}
            >
              <span className="button-text">{isBooked ? 'Booked!' : 'Book Now'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
