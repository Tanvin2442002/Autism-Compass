import { faAddressBook, faCalendarDays, faChild, faEnvelope, faHospital, faPenToSquare, faPhone, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import './BookedTherapy.css';
const URL = process.env.REACT_APP_API_URL;

const BookedTherapy = () => {
   const [data, setData] = useState([]);
   const localData = JSON.parse(localStorage.getItem('USER'));
   const [showConfirmation, setShowConfirmation] = useState(false);
   const [consultationToDelete, setConsultationToDelete] = useState(null);
   const navigate = useNavigate();

   const transformToUppercase = (data) => {
      return Object.fromEntries(
         Object.entries(data).map(([key, value]) => [key.toUpperCase(), value])
      );
   };

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(`${URL}/booking/data?id=${localData.ID}&type=${localData.TYPE}`);
            const res = await response.json();
            const data = res.map(it => transformToUppercase(it));
            setData(data);
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      };
      fetchData();
   }, []);

   const handleDeleteClick = (it) => {

      setShowConfirmation(true);
      setConsultationToDelete(it);
   };

   const handleDelete = async () => {

      if (consultationToDelete) {
         const { C_ID, P_ID, TH_ID, THO_ID } = consultationToDelete;
   
         const response = await fetch(`${URL}/booking/delete?C_ID=${C_ID}&P_ID=${P_ID}&TH_ID=${TH_ID}&THO_ID=${THO_ID}`, { method: 'DELETE' });
         const res = await response.json();
   
         if (res.success) {
            setData(data.filter(item => item.C_ID !== C_ID || item.P_ID !== P_ID || item.TH_ID !== TH_ID || item.THO_ID !== THO_ID));
         }
         setShowConfirmation(false);
         setConsultationToDelete(null);
      }
   };

   const handleCancelDelete = () => {
      setShowConfirmation(false);
      setConsultationToDelete(null);
   };

   const handleEditClick = (it) => {

      // navigate(`/edit-therapy/${it.C_ID}/${it.P_ID}/${it.TH_ID}/${it.THO_ID}`);
      navigate(`/therapy/booking?TH_ID=${it.TH_ID}&THO_ID=${it.THO_ID}`);
   }

   return (
      <div className='booked-therapy'>
         <Navbar />
         <h1>Booked Therapy</h1>
         <div className='booked-therapy-main'>
            {data.map((it) => (
               <div key={it.ID} className='booked-therapy-details'>
                  <h2>{it.THERAPY_TYPE}</h2>
                  <div className="single-info">
                     <FontAwesomeIcon icon={faHospital} />
                     <p>{it.ORG_NAME}</p>
                  </div>
                  <div className="single-info">
                     <FontAwesomeIcon icon={faCalendarDays} />
                     <p>{it.BOOKING_DATE}</p>
                  </div>
                  <div className="single-info">
                     <FontAwesomeIcon icon={faChild} />
                     <p>{it.CHILD_NAME}</p>
                  </div>
                  <div className="single-info">
                     <FontAwesomeIcon icon={faEnvelope} />
                     <p>{it.CHILD_EMAIL}</p>
                  </div>
                  <div className="single-info">
                     <FontAwesomeIcon icon={faPhone} />
                     <p>{it.ORG_CONTACT_NO}</p>
                  </div>
                  <div className="single-info">
                     <FontAwesomeIcon icon={faEnvelope} />
                     <p>{it.ORG_EMAIL}</p>
                  </div>
                  <div className="single-info">
                     <FontAwesomeIcon icon={faAddressBook} />
                     <p>{it.ORG_STREET}{it.ORG_CITY}</p>
                  </div>
                  <div className='button-div'>
                     <button className="delete-button" onClick={() => handleEditClick(it)}>
                        <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: 'green' }} />
                        <span className="delete-label" style={{ color: '#2b831a'}}>Edit</span>
                     </button>
                     <button className="delete-button" onClick={() => handleDeleteClick(it)}>
                        <FontAwesomeIcon icon={faTrashAlt} size="lg" style={{ color: '#e74c3c' }} />
                        <span className="delete-label">Delete</span>
                     </button>
                  </div>
               </div>
            ))}
            {showConfirmation && (
               <div className="confirmation-dia">
                  <div className="confirmation-dia-content">
                     <p>Are you sure you want to delete this?</p>
                     <button className="con-btn" onClick={handleDelete}>Yes</button>
                     <button className="can-btn" onClick={handleCancelDelete}>No</button>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default BookedTherapy;
