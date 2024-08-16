import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import './BookedTherapy.css';

const BookedTherapy = () => {
   const [data, setData] = useState([]);
   const localData = JSON.parse(localStorage.getItem('USER'));

   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch(`http://localhost:5000/booking/data?id=${localData.ID}&type=${localData.TYPE}`);
         const res = await response.json();
         setData(res);
      };
      fetchData();
   }, []);

   const handleDelete = async (C_ID, P_ID, TH_ID, THO_ID) => {
      console.log("C_ID:", C_ID, "P_ID:", P_ID, "TH_ID:", TH_ID, "THO_ID:", THO_ID);
      const response = await fetch(`http://localhost:5000/booking/delete?C_ID=${C_ID}&P_ID=${P_ID}&TH_ID=${TH_ID}&THO_ID=${THO_ID}`, { method: 'DELETE' });
      const res = await response.json();
      console.log("Response:", res);
      if (res.success) {
         setData(data.filter(item => item.C_ID !== C_ID && item.P_ID !== P_ID && item.TH_ID !== TH_ID && item.THO_ID !== THO_ID));
      }
      
   };

   return (
      <div className='booked-therapy'>
         <Navbar />
         <div className='booked-therapy-main'>
            <h1>Booked Therapy</h1>
            {data.map((it) => (
               <div key={it.ID} className='booked-therapy-details'>
                  <div className="booked-therapy-title">
                     <h2>{it.THERAPY_TYPE}</h2>
                     <button className="delete-container" onClick={() => handleDelete(it.C_ID, it.P_ID, it.TH_ID, it.THO_ID)}>
                        <FontAwesomeIcon icon={faDeleteLeft}
                           size = "xl"
                           style={{ color: "#f50505" }} className="fa-delete-left" />
                        <span className="delete-text">Delete Booking</span>
                     </button>
                  </div>
                  <div className='details-info'>
                     <div className='parent-child-info'>
                        <p>{it.PARENT_NAME}</p>
                        <p>{it.PARENT_EMAIL}</p>
                        <p>{it.CHILD_NAME}</p>
                        <p>{it.CHILD_EMAIL}</p>
                        <p>{it.BOOKING_DATE}</p>
                     </div>
                     <div className='image'>
                        <img src="https://png.pngtree.com/png-clipart/20240404/original/pngtree-flat-hospital-icon-building-vector-png-image_14747636.png" alt="img" />
                     </div>
                     <div className='org-info'>
                        <p>{it.ORG_NAME}</p>
                        <p>{it.ORG_CONTACT_NO}</p>
                        <p>{it.ORG_EMAIL}</p>
                        <p>{it.ORG_STREET}</p>
                        <p>{it.ORG_CITY}, {it.ORG_POSTAL_CODE}</p>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default BookedTherapy;
