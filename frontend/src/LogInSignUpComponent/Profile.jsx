import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ProfileImage from '../img/Profile.svg';
import LoadingAnimation from '../LoadingAnimation';
import Navbar from '../Navbar.js';
import RevealLeftToRight from '../RevealLeftToRight';
import './Profile.css';
const URL = process.env.REACT_APP_API_URL;

const Profile = () => {
   const navigate = useNavigate();
   const [profileData, setProfileData] = useState({
      TYPE: '',
      ID: '',
      NAME: '',
      DOB: '',
      AGE: '',
      CONTACT_NO: '',
      EMAIL: '',
      P_EMAIL: '',
      STREET: '',
      CITY: '',
      POSTAL_CODE: '',
      DEGREE: '',
      FIELD_OF_SPEC: '',
      INSTITUTION: '',
      HOSPITAL: '',
      VISIT_TIME: '',
   });

   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [gender, setGender] = useState('boy');
   const userData = JSON.parse(localStorage.getItem('USER'));

   const transformToUppercase = (data) => {
      return Object.fromEntries(
         Object.entries(data).map(([key, value]) => [key.toUpperCase(), value])
      );
   };

   useEffect(() => {
      const fetchData = async () => {
         if (!userData) {
            setError('USER not found in local storage');
            setLoading(false);
            return;
         }
         try {
            const response = await fetch(`${URL}/reg/user-info?ID=${userData.ID}&TYPE=${userData.TYPE}`, {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json'
               },
            });
            if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            // uppercase the keys
            data[0] = transformToUppercase(data[0]);
            setProfileData({
               TYPE: userData.TYPE,
               ID: userData.ID,
               NAME: data[0].NAME || '',
               DOB: data[0].DOB || '',
               AGE: data[0].AGE || '',
               CONTACT_NO: data[0].CONTACT_NO || '',
               EMAIL: data[0].EMAIL || '',
               P_EMAIL: data[0].P_EMAIL || '',
               STREET: data[0].STREET || data[0].ADDRESS?.STREET || '',
               CITY: data[0].CITY || data[0].ADDRESS?.CITY || '',
               POSTAL_CODE: data[0].POSTAL_CODE || data[0].ADDRESS?.POSTAL_CODE || '',
               DEGREE: data[0].DEGREE || '',
               FIELD_OF_SPEC: data[0].FIELD_OF_SPEC || '',
               INSTITUTION: data[0].INSTITUTION || '',
               HOSPITAL: data[0].NAME_OF_HOSPITAL || '',
               VISIT_TIME: data[0].VISIT_TIME || ''
            });
            
         } catch (err) {
            console.error('Error fetching user info:', err);
         } finally {
            setLoading(false);
         }
      };


      fetchData();
   }, []);

   const fetchGenderData = async () => {
      
      const genderResponse = await fetch(`https://api.genderapi.io/api/?name=${encodeURIComponent(profileData.NAME)}&key=667faf277a781c44944e8b13`);
      const genderData = await genderResponse.json();
      if (genderData.status && genderData.gender !== 'null') {
         setGender(genderData.gender === 'female' ? 'girl' : 'boy');
      }
      
   };
   fetchGenderData();
   

   const handleChange = (e) => {
      const { name, value } = e.target;
      setProfileData({
         ...profileData,
         [name]: value
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      let newUserData = {
         ID: userData.ID,
         TYPE: userData.TYPE,
         NAME: profileData.NAME,
         EMAIL: profileData.EMAIL,
         CONTACT_NO: profileData.CONTACT_NO
      };
      if (userData.TYPE === 'CHILD') {
         // add new thing with newUserData
         newUserData = {
            ...newUserData,
            P_EMAIL: profileData.P_EMAIL,
            STREET: profileData.STREET,
            CITY: profileData.CITY,
            POSTAL_CODE: profileData.POSTAL_CODE
         };
      }
      else if (userData.TYPE === 'PARENT') {
         newUserData = {
            ...newUserData,
            STREET: profileData.STREET,
            CITY: profileData.CITY,
            POSTAL_CODE: profileData.POSTAL_CODE
         };
      }
      else if (userData.TYPE === 'TEACHER') {
         newUserData = {
            ...newUserData,
            INSTITUTION: profileData.INSTITUTION
         };
      }
      else if (userData.TYPE === 'HEALTH_PROFESSIONAL') {
         newUserData = {
            ...newUserData,
            DEGREE: profileData.DEGREE,
            FIELD_OF_SPEC: profileData.FIELD_OF_SPEC,
            STREET: profileData.STREET,
            CITY: profileData.CITY,
            POSTAL_CODE: profileData.POSTAL_CODE
         };
      }

      
      const response = await fetch(`${URL}/reg/update-user-info`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(newUserData)
      });

      toast.success("Pofile Info Updated", {
         position: "top-right",
         autoClose: 2500,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: false,
         draggable: true,
         progress: undefined,
         theme: "colored",
      });
      // await fetchGenderData();
   };

   const handleDelete = async () => {
      const ID = userData.ID;
      
      if (userData.TYPE === 'CHILD') {
         try{
            const response = await fetch(`${URL}/remove/child`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ C_ID: ID }),
            });
            if (response.ok) {
               const res = await response.json();
               
               localStorage.removeItem('USER');
               navigate('/');
            } else {
               console.error('Failed to delete the child.');
            }
         }catch(err){
            console.error('Error:', err);
         }
      }
      else if (userData.TYPE === 'PARENT') {
         try {
            const response = await fetch(`${URL}/remove/parent`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ P_ID: ID }),
            });
            if (response.ok) {
               const res = await response.json();
               
               localStorage.removeItem('USER');
               navigate('/');
            } else if(response.status==400){
               const errorResponse = await response.json(); 
               toast.warning(errorResponse.message, {
                  position: "top-right",
                  autoClose: 2500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
               });
           }
           else if(response.status==401){
            const errorResponse = await response.json(); 
            toast.warning(errorResponse.message, {
               position: "top-right",
               autoClose: 2500,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: true,
               progress: undefined,
               theme: "light",
            });
        }
         } catch (err) {
            console.error('Error:', err);
         }
      }

      else if (userData.TYPE === 'HEALTH_PROFESSIONAL') {
         try {
            const response = await fetch(`${URL}/remove/doctor`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ D_ID: ID }),
            });
            if (response.ok) {
               const res = await response.json();
               
               localStorage.removeItem('USER');
               navigate('/');
            } else {
               console.error('Failed to delete the health professional.');
            }
         } catch (err) {
            console.error('Error:', err);
         }
      }

      else if (userData.TYPE === 'TEACHER') {
         
         try {
            const response = await fetch(`${URL}/remove/teacher`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ T_ID: ID }),
            });
            if (response.ok) {
               const res = await response.json();
               
               localStorage.removeItem('USER');
               navigate('/');
            } else {
               console.error('Failed to delete the teacher.');
            }
         } catch (err) {
            console.error('Error:', err);
         }
      }
   };

   if (loading) return <LoadingAnimation />;
   if (error) return <p>Error: {error}</p>;

   // child user              : name, contact number, email, parent email, street, city, postal code, age
   // parent user             : name, contact number, email, street, city, postal code, age
   // teacher user            : name, contact number, email, institution
   // healthprofessional user : name, contact number, email, degree, field of specilaization, street, city, postal code

   

   fetchGenderData();

   return (
      <div className='profile'>
         <ToastContainer />
         <>
            <Navbar />
            <ul class="circles">
               <li></li>
               <li></li>
               <li></li>
               <li></li>
               <li></li>
               <li></li>
               <li></li>
               <li></li>
               <li></li>
               <li></li>
            </ul>
            <div className='user-profile-with-img'>
               <RevealLeftToRight>
                  <div className="user-profile">
                     <div className="avatar">
                        <img src={`https://avatar.iran.liara.run/public/${gender}?username=${encodeURIComponent(profileData.NAME)}`} alt='Avatar' />
                     </div>
                     <div className="profile-info">
                        <h1>{profileData.NAME}</h1>
                     </div>
                     <div className='profile-grid'>
                        <div className="profile-form-group">
                           <label>Name</label>
                           <label>:</label>
                           <input
                              type="text"
                              name="NAME"
                              placeholder="Enter your Name"
                              value={profileData.NAME}
                              onChange={handleChange}
                           />
                        </div>
                        <div className="profile-form-group">
                           <label>Email Address</label>
                           <label>:</label>
                           <input
                              type="text"
                              name="EMAIL"
                              placeholder="Email Address"
                              disabled
                              value={profileData.EMAIL}
                              onChange={handleChange}
                           />
                        </div>
                        <div className="profile-form-group">
                           <label>Contact Number</label>
                           <label>:</label>
                           <input
                              type="text"
                              name="CONTACT_NO"
                              placeholder="Enter contact number"
                              value={profileData.CONTACT_NO}
                              onChange={handleChange}
                           />
                        </div>
                        {userData.TYPE === 'CHILD' && (
                           <div className="profile-form-group">
                              <label>Parent Email ID</label>
                              <label>:</label>
                              <input
                                 type="email"
                                 name="P_EMAIL"
                                 disabled
                                 value={profileData.P_EMAIL}
                                 onChange={handleChange}
                              />
                           </div>
                        )}
                        {(userData.TYPE === 'CHILD' || userData.TYPE === 'PARENT' || userData.TYPE === 'HEALTH_PROFESSIONAL') && (
                           <>
                              <div className="profile-form-group">
                                 <label>Street</label>
                                 <label>:</label>
                                 <input
                                    type="text"
                                    name="STREET"
                                    placeholder="Enter street"
                                    value={profileData.STREET}
                                    onChange={handleChange}
                                 />
                              </div>
                              <div className="profile-form-group">
                                 <label>City</label>
                                 <label>:</label>
                                 <input
                                    type="text"
                                    name="CITY"
                                    placeholder="Enter city"
                                    value={profileData.CITY}
                                    onChange={handleChange}
                                 />
                              </div>
                              <div className="profile-form-group">
                                 <label>Postal Code</label>
                                 <label>:</label>
                                 <input
                                    type="number"
                                    name="POSTAL_CODE"
                                    placeholder="Enter postal code"
                                    value={profileData.POSTAL_CODE}
                                    onChange={handleChange}
                                 />
                              </div>
                           </>
                        )}
                        {userData.TYPE === 'TEACHER' && (
                           <div className="profile-form-group">
                              <label>Institution</label>
                              <label>:</label>
                              <input
                                 type="text"
                                 name="INSTITUTION"
                                 placeholder="Institution"
                                 value={profileData.INSTITUTION}
                                 onChange={handleChange}
                              />
                           </div>
                        )}
                        {userData.TYPE === 'HEALTH_PROFESSIONAL' && (
                           <>
                              <div className="profile-form-group">
                                 <label>Degree</label>
                                 <label>:</label>
                                 <input
                                    type="text"
                                    name="DEGREE"
                                    placeholder="Degree"
                                    value={profileData.DEGREE}
                                    onChange={handleChange}
                                 />
                              </div>
                              <div className="profile-form-group">
                                 <label>Field of Specialization</label>
                                 <label>:</label>
                                 <input
                                    type="text"
                                    name="FIELD_OF_SPEC"
                                    placeholder="Field of specialization"
                                    value={profileData.FIELD_OF_SPEC}
                                    onChange={handleChange}
                                 />
                              </div>
                              <div className="profile-form-group">
                                 <label>Hospital</label>
                                 <label>:</label>
                                 <input
                                    type="text"
                                    name="STREET"
                                    placeholder="Enter street"
                                    value={profileData.HOSPITAL}
                                    onChange={handleChange}
                                 />
                              </div>
                              <div className="profile-form-group">
                                 <label>Visit Time</label>
                                 <label>:</label>
                                 <input
                                    type="text"
                                    name="CITY"
                                    placeholder="Enter city"
                                    value={profileData.VISIT_TIME}
                                    onChange={handleChange}
                                 />
                              </div>
                           </>
                        )}
                        {userData.TYPE === 'CHILD' || userData.TYPE == 'PARENT' && (
                           <>
                              <div className="profile-form-group">
                                 <label>Age</label>
                                 <label>:</label>
                                 <input
                                    type="text"
                                    name="AGE"
                                    disabled
                                    placeholder="Enter your age"
                                    value={profileData.AGE}
                                    onChange={handleChange}
                                 />
                              </div>
                           </>
                        )}
                        <div className="button-group">
                           <button className='view-more-button' onClick={handleDelete}>Delete Account</button>
                           <button className='view-more-button' onClick={handleSubmit}>Update Info</button>
                        </div>
                     </div>
                  </div>
               </RevealLeftToRight>
               <motion.img src={ProfileImage} alt='Profile' className='profile-img'
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                     duration: 0.3,
                     ease: [0, 0.71, 0.2, 1.01],
                     scale: {
                        type: "spring",
                        damping: 5,
                        stiffness: 100,
                        restDelta: 0.001
                     }
                  }} />
            </div>
         </>
      </div>
   );
};

export default Profile;
