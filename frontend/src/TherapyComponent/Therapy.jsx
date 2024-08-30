import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Therapy.css';
import 'boxicons/css/boxicons.min.css';
import TherapyDis from '../img/TherapyDis.svg';
import Navbar from '../Navbar';
import LoadingAnimation from '../LoadingAnimation';

const AvailableTherapies = () => {
   const [therapies, setTherapies] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchTherapies = async () => {
         try {
            const response = await fetch(`http://localhost:5000/therapy/all`);
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log('Fetched data:', data);
            setTherapies(data);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      };
      fetchTherapies();
   }, []);

   const handleSearch = async (e) => {
      const searchValue = e.target.value;
      setLoading(true);
      try {
         const response = await fetch(`http://localhost:5000/therapy/search?search=${searchValue}`);
         if (!response.ok) {
            throw new Error("Network response was not ok");
         }
         const data = await response.json();
         console.log('Search value:', searchValue);
         console.log('Fetched data:', data);
         setTherapies(data);
      } catch (err) {
         setError(err.message);
      } finally {
         setLoading(false);
      }
   };
   const handleEventClick = (therapyId) => {
      navigate(`/therapy/detail?type=${therapyId}`);
   };

   return (
      <div>
         <Navbar />
         <div className='therapy-details'>
            <div className="avaiableTherapyContents">
               <h1>Available Therapies</h1>
               <div className="search-input-box">
                  <input
                     type="text"
                     placeholder="Search therapies..."
                     onChange={handleSearch}
                     required />
                  <i className='bx bx-search'></i>
               </div>
               {loading && <LoadingAnimation />}
               {error && <p>{error}</p>}
               <div className="therapy-list">
                  {therapies.map((therapy) => (
                     <div key={therapy.TH_ID} className='therapy-item'>
                        <h2>{therapy.THERAPY_TYPE}</h2>
                        <p>{therapy.THERAPY_DESCRIPTION}</p>
                        <button className='view-more-button' onClick={() => handleEventClick(therapy.TH_ID)}>
                           View More Details...
                        </button>
                     </div>
                  ))}
               </div>
            </div>
            <div className="therapy-details-image">
               <img src={TherapyDis} alt="Therapy Details" />
            </div>
         </div>
      </div>
   );
};

export default AvailableTherapies;
