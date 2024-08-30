import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'boxicons/css/boxicons.min.css';
import './BookingTherapy.css';
import OrgImage from '../img/OrgImage.svg';
import LoadingAnimation from '../LoadingAnimation';

const BookingTherapy = () => {
   const [orgDetails, setOrgDetails] = useState(null);
   const [userDetails, setUserDetails] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [therapyType, setTherapyType] = useState(null);
   const [childEmail, setChildEmail] = useState('');
   const [childName, setChildName] = useState('');
   const [isEmailValid, setIsEmailValid] = useState(false);

   const location = useLocation();
   const params = new URLSearchParams(location.search);
   const therapyId = params.get('TH_ID');
   const orgId = params.get('THO_ID');

   const localData = JSON.parse(localStorage.getItem('USER'));

   useEffect(() => {
      console.log('Therapy ID:', therapyId, 'Org ID:', orgId);

      const fetchOrgDetails = async () => {
         try {
            const response = await fetch(`http://localhost:5000/booking/therapy/orgdata?THO_ID=${orgId}`);
            console.log('Response:', response);
            const data = await response.json();
            console.log('Data:', data);
            setOrgDetails(data);
         } catch (error) {
            console.error('Error fetching organization data:', error);
            setError('Failed to fetch organization data.');
         } finally {
            setLoading(false);
         }
      };

      const fetchTherapyDetails = async () => {
         try {
            const response = await fetch(`http://localhost:5000/booking/therapy/therapydata?TH_ID=${therapyId}`);
            const data = await response.json();
            console.log("Therapy data:", data[0].THERAPY_TYPE);
            setTherapyType(data[0].THERAPY_TYPE);
         } catch (error) {
            console.error('Error fetching therapy data:', error);
            setError('Failed to fetch therapy data.');
         } finally {
            setLoading(false);
         }
         console.log('Therapy Type:', therapyType);
      };

      const fetchData = async () => {
         console.log('Local data:', localData);
         try {
            let response;
            if (localData.TYPE === 'PARENT') {
               response = await fetch(`http://localhost:5000/booking/therapy/child/data?P_ID=${localData.ID}`);
            } else {
               response = await fetch(`http://localhost:5000/booking/therapy/parent/data?C_ID=${localData.ID}`);
            }
            const data = await response.json();
            console.log('User data:', data[0]);
            setUserDetails(data[0]);
         } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Failed to fetch user data.');
         }
      }

      fetchOrgDetails();
      fetchTherapyDetails();
      fetchData();
   }, [therapyId, orgId]);

   const handleConfirmBooking = async (e) => {
      e.preventDefault();
      const bookingData = {
         TH_ID: therapyId,
         THO_ID: orgId,
         P_ID: userDetails.P_ID,
         C_ID: userDetails.C_ID,
         BOOKING_DATE: `${e.target[8].value} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
      }
      console.log('Booking data:', bookingData);
      const response = await fetch('http://localhost:5000/booking/therapy', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      console.log('Booking response:', data);
      console.log('Booking status:', response.status);
      if (response.status === 200) {
         toast.success("Booking Successful", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
         });
      } else {
         toast.error("Booking failed!", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
         });
      }
   };

   const handleChildEmailChange = async (e) => {
      const email = e.target.value;
      setChildEmail(email);

      if (email) {
         try {
            const response = await fetch(`http://localhost:5000/booking/therapy/child/check?email=${email}&P_ID=${userDetails.P_ID}`);
            const data = await response.json();
            console.log('Email data:', data[0].NAME);
            if (data[0].NAME) {
               setChildName(data[0].NAME);
               console.log('------', childName);
               setIsEmailValid(true);
               const tempData = { ...userDetails, C_ID: data[0].C_ID };
               setUserDetails(tempData);
            } else {
               setChildName('');
               setIsEmailValid(false);
            }
         } catch (error) {
            console.error('Error checking child email:', error);
            setIsEmailValid(false);
            setChildName('');
         }
      } else {
         setChildName('');
         setIsEmailValid(false);
      }
      console.log('Child email:', email);
      console.log('Child name:', childName);
   };

   if (loading) {
      return <LoadingAnimation />;
   }

   if (error) {
      return <div>{error}</div>;
   }

   const currentDate = new Date().toISOString().split('T')[0];
   const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

   return (
      <div className='booking'>
         <ToastContainer />
         <Navbar />
         <div className='booking-heading'>
            <div className="organization-details">
               {/* <h2>Organization Details</h2> */}
               <img src={OrgImage} alt="Organization" />
            </div>
            <div className="user-details">
               <h2>Fill up the details</h2>
               <form onSubmit={handleConfirmBooking}>
                  <div className="user-info">
                     <input
                        required
                        type="text"
                        value={orgDetails[0].NAME}
                     />
                     <label>Organization Name</label>
                  </div>
                  <div className="user-info">
                     <input
                        required
                        type="text"
                        value={orgDetails[0].CONTACT_NO}
                     />
                     <label>Contact No.</label>
                  </div>
                  <div className="user-info">
                     <input
                        required
                        type="text"
                        value={orgDetails[0].EMAIL}
                     />
                     <label>Organization Email</label>
                  </div>
                  {userDetails && (
                     <>
                        <div className='parent-user-info'>
                           <div className="user-info">
                              <input
                                 required
                                 autoComplete="off"
                                 type="email"
                                 value={userDetails.PARENT_EMAIL || ''}
                              />
                              <label htmlFor="email">Parent Email</label>
                           </div>
                           <div className="user-info">
                              <input
                                 required
                                 autoComplete="off"
                                 type="name"
                                 value={userDetails.PARENT_NAME || ''}
                              />
                              <label htmlFor="name">Parent Name</label>
                           </div>
                        </div>
                        {localData.TYPE === 'PARENT' && (
                           <div className='child-user-info'>
                              <div className="user-info">
                                 <input
                                    required
                                    autoComplete="off"
                                    type="email"
                                    value={childEmail}
                                    onChange={handleChildEmailChange}
                                    className={isEmailValid ? 'valid' : ''}
                                 />
                                 <label htmlFor="email">Child Email</label>
                              </div>
                              <div className="user-info">
                                 <input
                                    required
                                    autoComplete="off"
                                    type="name"
                                    value={childName}
                                 />
                                 <label htmlFor="name">Child Name</label>
                              </div>
                           </div>
                        )}
                        {localData.TYPE === 'CHILD' && (
                           <div className='child-user-info'>
                              <div className="user-info">
                                 <input
                                    required
                                    autoComplete="off"
                                    type="email"
                                    value={userDetails.CHILD_EMAIL || ''}
                                 />
                                 <label htmlFor="email">Child Email</label>
                              </div>
                              <div className="user-info">
                                 <input
                                    required
                                    autoComplete="off"
                                    type="name"
                                    value={userDetails.CHILD_NAME || ''}
                                 />
                                 <label htmlFor="name">Child Name</label>
                              </div>
                           </div>
                        )}
                     </>
                  )}
                  <div className="user-info">
                     <input
                        required
                        autoComplete="off"
                        type="text"
                        value={therapyType || ''}
                     />
                     <label htmlFor="text">Therapy Type</label>
                  </div>
                  <div className="user-info">
                     <input
                        required
                        type="date"
                        id="preferable-date"
                        defaultValue={currentDate}
                     />
                     <label htmlFor="preferable-date">Preferable Date</label>
                  </div>

                  <div className="user-info">
                     <input
                        required
                        autoComplete="off"
                        type="time"
                        id="preferable-time"
                        defaultValue={currentTime}
                     />
                     <label htmlFor="preferable-time">Preferable Time</label>
                  </div>
                  <button className='confirm-button'>
                     Confirm booking
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default BookingTherapy;
