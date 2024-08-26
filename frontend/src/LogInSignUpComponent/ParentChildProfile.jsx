import React, { useState, useEffect } from "react";
import "./ParentChildProfile.css";
import parentChildImg from "../img/ParentChild.svg";
import Navbar from '../Navbar.js';

const ParentChildProfile = () => {
   const [infoList, setInfoList] = useState([]);

   const localData = JSON.parse(localStorage.getItem('USER'));
   const parentId = localData.ID;
   const type = localData.TYPE;


   useEffect(() => {
      const fetchInfo = async () => {
         try {
            const response = await fetch(`http://localhost:5000/reg/parent-child-info?TYPE=${type}&ID=${parentId}`);
            const data = await response.json();
            if (data && data.length > 0) {
               const formattedData = data.map(childData => ({
                  name: childData.NAME,
                  email: childData.EMAIL,
                  dob: new Date(childData.DOB).toISOString().split('T')[0],
                  age: childData.AGE,
                  contactNo: childData.CONTACT_NO,
                  disorder: type === 'PARENT' ? childData.DISORDER : '-'
               }));
               setInfoList(formattedData);
               console.log("Data fetched successfully:", formattedData);
            }
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      };

      fetchInfo();
   }, [parentId, type]);

   return (
      <div className="parent-child-profile-info">
         <Navbar />
         <h1> {type == "PARENT" ? "CHILD" : "PARENT"} INFORMATION</h1>
         {infoList.length > 0 ? (
            infoList.map((info, index) => (
               <div key={index} className="parentchilddivider">
                  <img
                     src={parentChildImg}
                     alt="Avatar"
                     className="imgSetting"
                  />
                  <div className="form-details-childparent">
                     {/* <div className="container-childparen"> */}
                     <form className="profile-form-childparent">
                        <div className="input-field-childparent">
                           <input
                              required
                              autoComplete="off"
                              type="text"
                              value={info.name}
                           />
                           <label htmlFor="username">Child Name</label>
                        </div>
                        <div className="input-field-childparent">
                           <input
                              required
                              autoComplete="off"
                              type="email"
                              value={info.email}
                           />
                           <label htmlFor="email">Child Email</label>
                        </div>
                        <div className="input-field-childparent">
                           <input
                              required
                              autoComplete="off"
                              type="text"
                              value={info.contactNo}
                           />
                           <label htmlFor="contact-no">Contact No.</label>
                        </div>
                        {info.disorder !== '-' && (
                           <div className="input-field-childparent">
                              <input
                                 required
                                 autoComplete="off"
                                 type="text"
                                 value={info.disorder}
                              />
                              <label htmlFor="disorder">Disorder</label>
                           </div>
                        )}
                        <div className="input-field-childparent">
                           <input
                              required
                              autoComplete="off"
                              type="date"
                              value={info.dob}
                           />
                           <label htmlFor="date">Birthday</label>
                        </div>
                        <div className="input-field-childparent">
                           <input
                              required
                              autoComplete="off"
                              type="number"
                              value={info.age}
                           />
                           <label htmlFor="age">Age</label>
                        </div>
                     </form>
                     {/* </div> */}
                  </div>
               </div>
            ))
         ) : (
            <p>No information available.</p>
         )}
      </div>
   );
};

export default ParentChildProfile;
