import { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import './Disorder.css';

const Disorder = () => {
   const [DisorderDetails, setDisorderDetails] = useState({
      Name: '',
      Description: ''
   });

   const userData = JSON.parse(localStorage.getItem('USER'));
   console.log(userData);

   useEffect(() => {
      console.log("Use Effect");

      const fetchData = async () => {
         try {
            // Create query parameter for ID
            const queryParams = new URLSearchParams({ ID: userData.ID }).toString();
            const response = await fetch(`http://localhost:5000/child/disorder?${queryParams}`, {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json'
               }
            });

            const data = await response.json();
            console.log("Data received");
            console.log(data);

            setDisorderDetails({
               Name: data[0].TYPE,
               Description: data[0].DESCRIPTION
            });
            console.log("Details");
            console.log(DisorderDetails);
         } catch (error) {
            console.log(error);
         }
      };

      fetchData();
   }, []);

   return (
      <div className='disorder'>
         <Navbar />
         <div className='disorder-item'>
            <h1>{DisorderDetails.Name}</h1>
            <p>{DisorderDetails.Description}</p>
         </div>
      </div>
   );
};

export default Disorder;
