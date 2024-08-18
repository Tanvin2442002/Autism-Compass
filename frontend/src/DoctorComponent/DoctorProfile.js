import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './DoctorProfile.css';
import { useLocation } from 'react-router-dom';

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const doctorId = params.get('id');
  const navigate = useNavigate(); // Use useNavigate for redirection

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/doctor/detail?id=${doctorId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDoctor(data[0]);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching doctor details:", err); 
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const handleBookingRedirect = () => {
    // Redirect to bookingDoc.js page and pass the doctorId
    navigate(`/booking/doc?DOC_ID=${doctorId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="doctor-profile-background">
      <Navbar />
      <div className="doctor-profile">
        <h1>Doctor's Profile</h1>
        {doctor && (
          <div className="profile-container">
            <img src={`https://avataaars.io/?avatarStyle=Circle&topType=${doctor.GENDER === 'male' ? 'ShortHairShortCurly' : 'LongHairStraight'}&accessoriesType=Blank&hairColor=${doctor.GENDER === 'male' ? 'Brown' : 'Blonde'}&facialHairType=Blank&clotheType=Doctor&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light`} alt="Profile" className="doctor-profile-avatar" />
            <h2 className="doctor-name">Dr. {doctor.NAME}</h2>
            <div className="info-group">
              <p className="attribute">Field of Specialization:</p>
              <div className="info-box slide-in">{doctor.FIELD_OF_SPEC}</div>
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
            <div className="info-group">
              <p className="attribute">Hospital:</p>
              <div className="info-box slide-in">{doctor.NAME_OF_HOSPITAL}</div>
            </div>
            <div className="info-group">
              <p className="attribute">Visit Time:</p>
              <div className="info-box slide-in">{doctor.VISIT_TIME}</div>
            </div>
            <div className="info-group">
              <p className="attribute">Address:</p>
              <div className="info-box slide-in">
                {doctor.ADDRESS.CITY}, {doctor.ADDRESS.STREET}, {doctor.ADDRESS.POSTAL_CODE}
              </div>
            </div>

            {/* Book Now button to redirect */}
            <button
              className="book-now-button"
              onClick={handleBookingRedirect}
              style={{ backgroundColor: 'red' }}
            >
              <span className="button-text">Book Now</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
