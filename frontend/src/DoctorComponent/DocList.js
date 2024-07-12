import React from 'react';
import './DocList.css';
import Navbar from '../Navbar';

const doctors = [
  {
    name: 'Dr. John Doe',
    gender: 'male',
    degree: 'MD',
    specialization: 'Pediatrics',
    hospital: 'City Hospital',
    profilePicture: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light'
  },
  {
    name: 'Dr. Jane Smith',
    gender: 'female',
    degree: 'PhD',
    specialization: 'Psychology',
    hospital: 'General Hospital',
    profilePicture: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=Blonde&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light'
  },
  {
    name: 'Dr. Emily Johnson',
    gender: 'female',
    degree: 'DO',
    specialization: 'Neurology',
    hospital: 'Specialty Clinic',
    profilePicture: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light'
  },
  {
    name: 'Dr. Michael Brown',
    gender: 'male',
    degree: 'MD',
    specialization: 'Cardiology',
    hospital: 'Heart Center',
    profilePicture: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light'
  },
  {
    name: 'Dr. Sarah Davis',
    gender: 'female',
    degree: 'MD',
    specialization: 'Dermatology',
    hospital: 'Skin Care Hospital',
    profilePicture: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light'
  },
  {
    name: 'Dr. David Wilson',
    gender: 'male',
    degree: 'MD',
    specialization: 'Orthopedics',
    hospital: 'Orthopedic Hospital',
    profilePicture: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Blonde&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light'
  }
];

const DoctorsList = () => {
  const handleBoxClick = (doctor) => {
    // You can add your navigation logic here
    console.log('Clicked on:', doctor.name);
  };

  return (
    <div className="doctors-background">
      <Navbar />
      <div className="wrapper">
        <h1>Doctors List</h1>
        <div className="search-box">
          <input type="text" placeholder="Search doctors..." required />
          <i className='bx bx-search'></i>
        </div>
        <div className="details">
          <div className="doc-container">
            {doctors.map((doctor, index) => (
              <div className="doc-box" key={index} onClick={() => handleBoxClick(doctor)}>
                <img src={doctor.profilePicture} alt="Profile" className="avatar" />
                <h3>{doctor.name}, <span className="degree">{doctor.degree}</span></h3>
                <p className="hospital">{doctor.hospital}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
