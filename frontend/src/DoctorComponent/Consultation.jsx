import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Prescription from '../img/Prescription.svg';
import './DoctorConsultationList.css'
const URL = process.env.REACT_APP_API_URL;

const Consultation = () => {

   const [info, setInfo] = useState({});
   const [selectedTherapy, setSelectedTherapy] = useState('');
   const [therapy, setTherapy] = useState([]);
   const localData = JSON.parse(localStorage.getItem('USER'));
   const location = useLocation();
   const p_id = location.state.p_id;
   const c_id = location.state.c_id;
   const d_id = localData.ID;
   const [formData, setFormData] = useState({
      C_ID: c_id,
      H_ID: d_id,
      TH_ID: '',
      FEEDBACK: ''
   });


   

   const transformToUppercase = (data) => {
      return Object.fromEntries(
         Object.entries(data).map(([key, value]) => [key.toUpperCase(), value])
      );
   };

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(`${URL}/consultation/form/data?P_ID=${p_id}&C_ID=${c_id}&D_ID=${d_id}`);
            const tempData = await response.json();
            const responseData = tempData.map(transformToUppercase);
            
            setInfo(responseData[0]);
            
         } catch (error) {
            
         }
      }

      const fetchTherapyData = async () => {
         try {
            const response = await fetch(`${URL}/therapy/all`);
            const tempData = await response.json();
            const responseData = tempData.map(transformToUppercase);
            
            setTherapy(responseData);
         } catch (error) {
            
         }
      }

      fetchData();
      fetchTherapyData();
   }, []);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value
      });
   };


   const handleConsultation = async (e) => {
      e.preventDefault();

      const response = await fetch(`${URL}/consultation/done`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(formData)
      });
      if (response.status === 200) {
         //add toastify
         toast.success('Consultation Succeed', {
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
         toast.error('Failed Consultation', {
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
   }

   return (
      <div>
         <Navbar />
         <div className='consultation'>
            <img
               className='prescription-img'
               src={Prescription}
               alt='Prescription'
            />
            {info && (
               <form className="consultation-form" onSubmit={handleConsultation}>
                  <h1>Details Information</h1>
                  <div className="input-field-childparent">
                     <input
                        required
                        autoComplete="off"
                        type="text"
                        value={info.PARENT_NAME || ''}
                     />
                     <label htmlFor="PARENT_NAME">Parent's Name</label>
                  </div>
                  <div className="input-field-childparent">
                     <input
                        required
                        autoComplete="off"
                        type="text"
                        value={info.CHILD_NAME || ''}
                     />
                     <label htmlFor="CHILD_NAME">Child's Name</label>
                  </div>
                  <div className="input-field-childparent">
                     <input
                        required
                        autoComplete="off"
                        type="email"
                        value={info.PARENT_EMAIL || ''}
                     />
                     <label htmlFor="PARENT_EMAIL">Parent's Email</label>
                  </div>
                  <div className="input-field-childparent">
                     <input
                        required
                        autoComplete="off"
                        type="text"
                        value={info.PARENT_CONTACT_NO || ''}
                     />
                     <label htmlFor="text">Parent's Contact No.</label>
                  </div>
                  <div className="input-field-childparent">
                     <input
                        required
                        autoComplete="off"
                        type="text"
                        value={info.DISORDER || ''}
                     />
                     <label htmlFor="text">Child's Disorder</label>
                  </div>
                  <div className="input-field-childparent">
                     <select
                        name="TH_ID"
                        value={formData.TH_ID}
                        onChange={handleInputChange}
                        required
                     >
                        <option value="" disabled>Suggest a Therapy</option>
                        {therapy.map((item) => (
                           <option key={item.TH_ID} value={item.TH_ID}>{item.THERAPY_TYPE}</option>
                        ))}
                     </select>
                     <label className='select-label'
                        htmlFor="text">Suggested Therapy</label>
                  </div>
                  <div className="input-field-childparent">
                     <input
                        autoComplete="off"
                        type="text"
                        name="FEEDBACK"
                        value={formData.FEEDBACK}
                        onChange={handleInputChange}
                     />
                     <label htmlFor="text">Feedback</label>
                  </div>
                  <button
                     className='view-more-button'
                     // onClick={handleConsultation}
                     type='submit'
                  >Consultation Done</button>
               </form>
            )}
         </div>
         <ToastContainer />
      </div>
   )
}

export default Consultation;
