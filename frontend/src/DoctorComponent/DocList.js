import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DocList.css';
import Navbar from '../Navbar';
import Loader from '../Loader';

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
            const doctorsWithGender = await Promise.all(
               data.map(async (doctor) => {
                  
                  const genderResponse = await fetch(`https://api.genderapi.io/api/?name=${encodeURIComponent(doctor.NAME.split(' ')[0])}&key=66c778a0073939556bc051f5`);
                  const genderData = await genderResponse.json();
                  const gender = genderData.gender === 'female' ? 'girl' : 'boy';
                  return {
                     ...doctor,
                     GENDER: genderData.status && genderData.gender !== 'null' ? gender : 'unknown'
                  };
               })
            );

            setDoctors(doctorsWithGender);
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

         // Fetch gender data for all doctors after search
         const doctorsWithGender = await Promise.all(
            data.map(async (doctor) => {
               const genderResponse = await fetch(`https://api.genderapi.io/api/?name=${encodeURIComponent(doctor.NAME)}&key=667faf277a781c44944e8b13`);
               const genderData = await genderResponse.json();
               const gender = genderData.gender === 'female' ? 'girl' : 'boy';
               return {
                  ...doctor,
                  GENDER: genderData.status && genderData.gender !== 'null' ? gender : 'unknown'
               };
            })
         );

         setDoctors(doctorsWithGender);
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
            {loading && <Loader />}
            {error && <p>{error}</p>}
            <div className="details">
               <div className="doc-container">
                  {doctors.map((doctor, index) => (
                     <div className="doc-box" key={index} onClick={() => handleBoxClick(doctor.H_ID)}>
                        <img src={`https://avataaars.io/?avatarStyle=Circle&topType=${doctor.GENDER === 'boy' ? 'ShortHairShortCurly' : 'LongHairStraight'}&accessoriesType=Blank&hairColor=${doctor.GENDER === 'boy' ? 'Brown' : 'Blonde'}&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light`} alt="Profile" className="doctor-list-avatar" />
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
