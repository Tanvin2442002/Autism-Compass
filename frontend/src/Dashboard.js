

import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Dashboard.css';
import Doctor from "./img/Doctor.svg"
import Therapy from "./img/Therapy.svg"
import FindDisorder from "./img/FindDisorder.svg"
import DoctorConsultationList from './DoctorComponent/DoctorConsultationList';

const Dashboard = () => {
   const [bookedDocData, setBookedDocData] = useState([]);
   const [availableDocData, setAvailableDocData] = useState([]);
   const [availableTherapyData, setAvailableTherapyData] = useState([]);
   const [bookedTherapyData, setBookedTherapyData] = useState([]);
   const [disorderData, setDisorderData] = useState({});
   const navigate = useNavigate();
   const localData = JSON.parse(localStorage.getItem('USER'));

   useEffect(() => {
      const fetchBookedDocData = async () => {
         try {
            const response = await fetch(`http://localhost:5000/dash/booked-doc?id=${localData.ID}&type=${localData.TYPE}`);
            const data = await response.json();
            setBookedDocData(data);
         } catch (error) {
            console.error('Error fetching consultations:', error);
            setBookedDocData([]);
         }
      };

      const fetchAvailableDocData = async () => {
         try {
            const response = await fetch(`http://localhost:5000/dash/available-doc`);
            const data = await response.json();
            setAvailableDocData(data);
         } catch (error) {
            console.error('Error fetching consultations:', error);
            setAvailableDocData([]);
         }
      };

      const fetchAvailableTherapyData = async () => {
         try {
            const response = await fetch(`http://localhost:5000/dash/available-therapy`);
            const data = await response.json();
            setAvailableTherapyData(data);
         } catch (error) {
            console.error('Error fetching consultations:', error);
            setAvailableTherapyData([]);
         }
      };

      const fetchBookedTherapy = async () => {
         try {
            const response = await fetch(`http://localhost:5000/booking/data?id=${localData.ID}&type=${localData.TYPE}`);
            const data = await response.json();
            setBookedTherapyData(data);

         } catch (error) {
            console.error('Error fetching consultations:', error);
            setBookedTherapyData([]);
         }
      };
      const fetchDisorderData = async () => {
         try {
            const response = await fetch(`http://localhost:5000/dash/disorder-info?id=${localData.ID}`);
            const data = await response.json();
            setDisorderData(data);
            console.log(data);
            console.log("Disorder Data: ", disorderData);
         } catch (error) {
            console.error('Error fetching consultations:', error);
            setDisorderData();
         }
      };

      if (localData.TYPE === 'CHILD' || localData.TYPE === 'PARENT') {
         fetchBookedDocData();
         fetchAvailableDocData();
         fetchAvailableTherapyData();
         fetchBookedTherapy();
         if (localData.TYPE === 'CHILD')
            fetchDisorderData();
      }
   }, []);

   let displayedBookedDocData, displayedBookedTherapyData, displayedAvailableDocData, displayedAvailableTherapyData;

   if (localData.TYPE === 'CHILD' || localData.TYPE === 'PARENT') {
      displayedBookedDocData = bookedDocData.slice(0, 2);
      displayedBookedTherapyData = bookedTherapyData.slice(0, 2);
      displayedAvailableDocData = availableDocData.slice(0, 2 + (bookedDocData.length >= 2 ? 0 : 2 - bookedDocData.length));
      displayedAvailableTherapyData = availableTherapyData.slice(0, 2 + (bookedTherapyData.length >= 2 ? 0 : 2 - bookedTherapyData.length));
   }
   const handleBookedDoctor = () => {
      navigate('/BookedList');
   }

   const handleAvailableDoctor = () => {
      navigate('/HealthProfessionals');
   }

   const handleBookedTherapy = () => {
      navigate('/therapy/booked');
   }

   const handleAvailableTherapy = () => {
      navigate('/therapy');
   }

   const handleDisorder = () => {
      navigate('/disorder');
   }

   return (
      <div>
         <Navbar />
         <div className="dashboard">
            {localData.TYPE === 'HEALTH_PROFESSIONAL' && (
               <DoctorConsultationList />
            )}
            {(localData.TYPE === 'PARENT' || localData.TYPE === 'CHILD') && (
               <>
                  <div className='doctor-consultation'>
                     <div className='doctor-consultation-info'>
                        <div className='dash-booked-doc'>
                           <h2 className='dashboard-heading'>Available Health Professional</h2>
                           <div className='booking-doctor'>
                              {displayedAvailableDocData.map((item) => (
                                 <div className="card-item-doc" key={item.H_ID}>
                                    <h2>Dr. {item.DOCTOR_NAME}</h2>
                                    <p>{item.FIELD_OF_SPEC}</p>
                                    <p className="label-square">{item.NAME_OF_HOSPITAL}</p>
                                    <p className="label-square">Contact No: {item.CONTACT_NO}</p>
                                 </div>
                              ))}
                           </div>
                           <button className='view-more-button' onClick={handleAvailableDoctor}>View more details</button>
                        </div>
                        <img src={Doctor} alt="Doctor" className="doctor-img" />
                        {displayedBookedDocData.length > 0 && (
                           <div className='dash-booking-doc'>
                              <h2 className='dashboard-heading'>Booked Doctor</h2>
                              <div className='booking-doctor'>
                                 {displayedBookedDocData.map((item) => (
                                    <div className="card-item-doc" key={item.H_ID}>
                                       <h2>Dr. {item.DOCTOR_NAME}</h2>
                                       <p>{item.NAME_OF_HOSPITAL}</p>
                                       <p className="label-square">Date: {item.SELECTED_DATE}</p>
                                       <p className="label-square">Child's Name: {item.CHILD_NAME}</p>
                                    </div>
                                 ))}
                              </div>
                              <button className='view-more-button' onClick={handleBookedDoctor}>View more details</button>
                           </div>
                        )}
                     </div>
                  </div>
                  <div className='therapy-booking-details'>
                     <div className='dash-therapy-info'>
                        {displayedBookedTherapyData.length > 0 && (
                           <div className='dash-booking-doc'>
                              <h2 className='dashboard-heading'>Booked Therapy</h2>
                              <div className='dash-booked-therapy'>
                                 {displayedBookedTherapyData.map((item) => (
                                    <div className="card-item-therapy" key={item.TH_ID}>
                                       <h2>{item.THERAPY_TYPE}</h2>
                                       <p>{item.ORG_NAME}</p>
                                       <p className="label-square">Date: {item.BOOKING_DATE}</p>
                                       <p className="label-square">Child's Name: {item.CHILD_NAME}</p>
                                    </div>
                                 ))}
                              </div>
                              <button className='view-more-button' onClick={handleBookedTherapy}>View more details</button>
                           </div>
                        )}
                        <img src={Therapy} alt="Therapy" className="doctor-img" />
                        <div className='dash-booking-doc'>
                           <h2 className='dashboard-heading'>Available Therapy</h2>
                           <div className='dash-available-therapy'>
                              {displayedAvailableTherapyData.map((item) => (
                                 <div className="card-item-therapy" key={item.TH_ID}>
                                    <h2>{item.THERAPY_TYPE}</h2>
                                 </div>
                              ))}
                           </div>
                           <button className='view-more-button' onClick={handleAvailableTherapy}>View more details</button>
                        </div>
                     </div>
                  </div>
               </>
            )}
            {localData.TYPE === 'CHILD' && (
               <div div className='disorder-info'>
                  <div className='dash-disorder-info'>
                     <div className='disorder-details'>
                        <div className='disorder-typography'>
                           <h2 className='dashboard-heading'>
                              <Typewriter
                                 words={[disorderData.TYPE]}
                                 loop
                                 cursor
                                 cursorStyle='_'
                                 typeSpeed={150}
                                 deleteSpeed={40}
                                 delaySpeed={1000}
                              />
                           </h2>
                           <p>Discription:
                              <Typewriter
                                 words={[disorderData.DESCRIPTION]}
                                 loop
                                 cursor
                                 cursorStyle='_'
                                 typeSpeed={50}
                                 deleteSpeed={40}
                                 delaySpeed={1000}
                              />
                           </p>
                        </div>
                        <button className='view-more-button' onClick={handleDisorder}>View more info about your disorder</button>
                     </div>
                     <img src={FindDisorder} alt="Find Disorder" className="doctor-img" />
                  </div>
               </div>
            )}
            {localData.TYPE === 'PARENT' && (
               <div className='delivery-info'>
                  <h3>Delivery details</h3>
                  <p>Details of product delivery</p>
               </div>
            )}
         </div>
      </div >
   );
};

export default Dashboard;
