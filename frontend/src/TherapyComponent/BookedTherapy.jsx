import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import './BookedTherapy.css';

const BookedTherapy = () => {

   const [data, setData] = useState([]);
   const localData = JSON.parse(localStorage.getItem('USER'));

   useEffect(() => {
      console.log(localData);
      const fetchData = async () => {
         const response = await fetch(`http://localhost:5000/booking/data?id=${localData.ID}&type=${localData.TYPE}`);
         const res = await response.json();
         console.log("Res: ", res);
         setData(res);
      }
      console.log("Data: ", data);
      fetchData();
   }, []);

   return (
      <div className='booked-therapy'>
         <Navbar />
         <div className='booked-therapy-main'>
            <h1>Booked Therapy</h1>
            {data.map((it) => (
               <>
                  <div key={it} className='booked-therapy-details'>
                     <h2>{it.THERAPY_TYPE}</h2>
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
               </>
            ))}
         </div>
      </div>
   )

}


export default BookedTherapy;