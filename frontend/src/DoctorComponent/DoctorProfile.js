import React, { useState } from 'react';
import Navbar from '../Navbar';
import './DoctorProfile.css';

const DoctorProfile = () => {
  const [isBooked, setIsBooked] = useState(false);

  const doctor = {
    name: 'Dr. John Doe',
    contactNo: '+880123456789',
    email: 'john.doe@example.com',
    degree: 'MD',
    specialization: 'Pediatrics',
    hospital: 'City Hospital',
    hospitalAddress: '123 Main St, Dhaka',
    timing: 'Mon-Fri 9:00 AM - 5:00 PM',
    profilePicture: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light'
  };

  const handleBooking = () => {
    setIsBooked(true);
  };

  return (
    <div className="profile-background">
      <Navbar />
      <div className="wrapper">
        <div className="search-box">
          <input type="text" placeholder="Search doctors..." required />
          <i className='bx bx-search'></i>
        </div>
        <h1>Doctor's Profile</h1>
        <div className="profile-container">
          <img src={doctor.profilePicture} alt="Profile" className="profile-avatar" />
          <h2 className="doctor-name">{doctor.name}</h2>
          <div className="info-group">
            <p className="attribute">Field of Specialization:</p>
            <div className="info-box slide-in">{doctor.specialization}</div>
          </div>
          <div className="info-group">
            <p className="attribute">Degree:</p>
            <div className="info-box slide-in">{doctor.degree}</div>
          </div>
          <div className="info-group">
            <p className="attribute">Contact No.:</p>
            <div className="info-box slide-in">{doctor.contactNo}</div>
          </div>
          <div className="info-group">
            <p className="attribute">Email:</p>
            <div className="info-box slide-in">{doctor.email}</div>
          </div>
          <div className="info-group">
            <p className="attribute">Hospital Name:</p>
            <div className="info-box slide-in">{doctor.hospital}</div>
          </div>
          <div className="info-group">
            <p className="attribute">Hospital Address:</p>
            <div className="info-box slide-in">{doctor.hospitalAddress}</div>
          </div>
          <div className="info-group">
            <p className="attribute">Timing:</p>
            <div className="info-box slide-in">{doctor.timing}</div>
          </div>
          <button 
            className={`book-now-button ${isBooked ? 'booked' : ''}`} 
            onClick={handleBooking}
          >
            <span className="button-text">{isBooked ? 'Booked!' : 'Book Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
