import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DocList.css';
import Navbar from '../Navbar';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/doctors');
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);


  const handleBoxClick = (doctorId) => {
    navigate(`/doctor/detail?id=${doctorId}`);
  };

  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/doctors/search?search=${searchValue}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDoctors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctors-background">
      <Navbar />
      <div className="doctor-list">
        <h1>Doctors List</h1>
        <div className="doctor-search-box">
          <input type="text" placeholder="Search doctors..." onChange={handleSearch} required />
          <i className='bx bx-search'></i>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className="details">
          <div className="doc-container">
            {doctors.map((doctor, index) => (
              <div className="doc-box" key={index} onClick={() => handleBoxClick(doctor.H_ID)}>
                <img src={`https://avataaars.io/?avatarStyle=Circle&topType=${doctor.GENDER === 'male' ? 'ShortHairShortCurly' : 'LongHairStraight'}&accessoriesType=Blank&hairColor=${doctor.GENDER === 'male' ? 'Brown' : 'Blonde'}&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light`} alt="Profile" className="doctor-list-avatar" />
                <h3>Dr. {doctor.NAME}, <span className="degree">{doctor.DEGREE}</span></h3>
                <p className="hospital">{doctor.FIELD_OF_SPEC}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
