import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Dashboard.css';

const Dashboard = () => {
   const [bookedDocData, setBookedDocData] = useState([]);
   const [availableDocData, setAvailableDocData] = useState([]);
   const [availableTherapyData, setAvailableTherapyData] = useState([]);
   const [bookedTherapyData, setBookedTherapyData] = useState([]);
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
            const response = await fetch(`http://localhost:5000/dash/booked-therapy?id=${localData.ID}&type=${localData.TYPE}`);
            const data = await response.json();
            setBookedTherapyData(data);
         } catch (error) {
            console.error('Error fetching consultations:', error);
            setBookedTherapyData([]);
         }
      };

      fetchBookedDocData();
      fetchAvailableDocData();
      fetchAvailableTherapyData();
      fetchBookedTherapy();
   }, []);

   

   console.log(bookedDocData.length, bookedTherapyData.length);

   const displayedBookedDocData = bookedDocData.slice(0, 3);
   const displayedBookedTherapyData = bookedTherapyData.slice(0, 3);

   
   const displayedAvailableDocData = availableDocData.slice(0, 3 + 3 - bookedDocData.length);
   const displayedAvailableTherapyData = availableTherapyData.slice(0, 3 + 3 - bookedTherapyData.length);

   return (
      <div className="dashboard">
         <Navbar />
         <div>
            <div className='doctor-consultation'>
               <div className='doctor-consultation-info'>
                  {/* Booked Doctor Section */}
                  <div className='dash-booked-doc'>
                     <h2 className='dashboard-heading'>Booked Doctor</h2>
                     <div className='booking-doctor'>
                        {displayedBookedDocData.map((item) => (
                           <div className="card-item-doc" key={item.H_ID}>
                              <h2>{item.DOCTOR_NAME}</h2>
                              <p>{item.NAME_OF_HOSPITAL}</p>
                              <p className="label-square">Date: {item.SELECTED_DATE}</p>
                              <p className="label-square">Child's Name: {item.CHILD_NAME}</p>
                           </div>
                        ))}
                     </div>
                     <button className='view-more-button'>View more details</button>
                  </div>
                  {/* Available Doctor Section */}
                  <div className='dash-booking-doc'>
                     <h2 className='dashboard-heading'>Available Health Professional</h2>
                     <div className='booking-doctor'>
                        {displayedAvailableDocData.map((item) => (
                           <div className="card-item-doc" key={item.H_ID}>
                              <h2>{item.DOCTOR_NAME}</h2>
                              <p>{item.FIELD_OF_SPEC}</p>
                              <p className="label-square">{item.NAME_OF_HOSPITAL}</p>
                              <p className="label-square">Contact No: {item.CONTACT_NO}</p>
                           </div>
                        ))}
                     </div>
                     <button className='view-more-button'>View more details</button>
                  </div>
               </div>
            </div>

            <div className='therapy-booking-details'>
               <div className='dash-therapy-info'>
                  {/* Booked Therapy Section */}
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
                     <button className='view-more-button'>View more details</button>
                  </div>
                  {/* Available Therapy Section */}
                  <div className='dash-booking-doc'>
                     <h2 className='dashboard-heading'>Available Therapy</h2>
                     <div className='dash-available-therapy'>
                        {displayedAvailableTherapyData.map((item) => (
                           <div className="card-item-therapy" key={item.TH_ID}>
                              <h2>{item.THERAPY_TYPE}</h2>
                           </div>
                        ))}
                     </div>
                     <button className='view-more-button'>View more details</button>
                  </div>
               </div>
            </div>

            <div className='delivery-info'>
               <h3>Delivery details</h3>
               <p>Details of product delivery</p>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
