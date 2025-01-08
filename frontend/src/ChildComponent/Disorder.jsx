import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import './Disorder.css';
import DisoderImg from '../img/Disorder.svg';
import LoadingAnimation from '../LoadingAnimation';

const URL = process.env.REACT_APP_API_URL;

const Disorder = () => {
   const [DisorderDetails, setDisorderDetails] = useState({
      Name: '',
      Description: ''
   });
   const [ans, setAns] = useState('');
   const [loading, setLoading] = useState(false);

   const userData = JSON.parse(localStorage.getItem('USER'));
   

   useEffect(() => {
      

      const fetchData = async () => {
         setLoading(true);
         try {
            const queryParams = new URLSearchParams({ ID: userData.ID }).toString();
            const response = await fetch(`${URL}/child/disorder?${queryParams}`, {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json'
               }
            });

            const data = await response.json();
            
            

            setDisorderDetails({
               Name: data[0].type,
               Description: data[0].description
            });
            
            
         } catch (error) {
            
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   const generateDisorderDetails = async () => {
      
      
      setLoading(true);
      try {
         const response = await axios({
            method: 'POST',
            url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBDtsrV0-dkgREsVJixmXSr6piKXbw9QPA',
            data: {
               contents: [
                  {
                     parts: [
                        { text: "Explain more about " + DisorderDetails.Name + " and how to handle with it." }
                     ]
                  }
               ]
            }
         });

         
         setAns(response.data.candidates[0].content.parts[0].text);
         
         setAns(response.data.candidates[0].content.parts[0].text.replace(/\*/g, ''));
      } catch (error) {
         console.error("Error generating disorder details", error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div>
         <Navbar />
         <div className='disorder'>
            <div className='disorder-info'>
               <div className='disorder-item'>
                  <h1>{DisorderDetails.Name}</h1>
                  <p>{DisorderDetails.Description}</p>
                  <button className='view-more-button' onClick={generateDisorderDetails}>Want to know more about this disorder</button>
               </div>
               <div className='disorder-item-details'>
                  {loading ? (
                     <LoadingAnimation />
                  ) : (
                     ans.length > 0 && (
                        <textarea className='answer' value={ans} readOnly />
                     )
                  )}
               </div>
            </div>
            <img src={DisoderImg} alt='Disorder' />
         </div>
      </div>
   );
};

export default Disorder;
