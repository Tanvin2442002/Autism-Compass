import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Therapy.css';
import 'boxicons/css/boxicons.min.css';
import TherapyDis from '../img/TherapyDis.svg';
import Navbar from '../Navbar';
import LoadingAnimation from '../LoadingAnimation';
import { motion } from 'framer-motion';
import RevealLeftToRight from '../RevealLeftToRight';
const URL = process.env.REACT_APP_API_URL;

const AvailableTherapies = () => {
   const [therapies, setTherapies] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   const transformToUppercase = (data) => {
      return Object.fromEntries(
         Object.entries(data).map(([key, value]) => [key.toUpperCase(), value])
      );
   };

   useEffect(() => {
      const fetchTherapies = async () => {
         try {
            const response = await fetch(`${URL}/therapy/all`);
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            const tempData = await response.json();
            const data = tempData.map(transformToUppercase);
            
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
         const response = await fetch(`${URL}/therapy/search?search=${searchValue}`);
         if (!response.ok) {
            throw new Error("Network response was not ok");
         }
         const tempData = await response.json();
         const data = tempData.map(transformToUppercase);
         
         
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
            <motion.div className="avaiableTherapyContents"
               initial={{ opacity: 0, x: -100 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5 }}
            >
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
                     <RevealLeftToRight>
                        <div key={therapy.TH_ID} className='therapy-item'>
                           <h2>{therapy.THERAPY_TYPE}</h2>
                           <p>{therapy.THERAPY_DESCRIPTION}</p>
                           <button className='view-more-button' onClick={() => handleEventClick(therapy.TH_ID)}>
                              View More Details...
                           </button>
                        </div>
                     </RevealLeftToRight>
                  ))}
               </div>
            </motion.div>
            <motion.div className="therapy-details-image"
               initial={{ opacity: 0, x: 100 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5 }}
            >
               <img src={TherapyDis} alt="Therapy Details" />
            </motion.div>
         </div>
      </div>
   );
};

export default AvailableTherapies;
