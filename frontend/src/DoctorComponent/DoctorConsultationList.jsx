import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import DataTable from 'react-data-table-component';
import "./DoctorConsultationList.css";
import { useNavigate } from "react-router-dom";
import DoctorConsultImg from "../img/DoctorConsultation.svg";
const URL = process.env.REACT_APP_API_URL;

const DoctorConsultation = () => {

   const [consultations, setConsultations] = useState([]);
   const localData = JSON.parse(localStorage.getItem('USER'));
   const navigate = useNavigate();

   const transformToUppercase = (data) => {
      return Object.fromEntries(
         Object.entries(data).map(([key, value]) => [key.toUpperCase(), value])
      );
   };

   const columns = [
      {
         name: 'Parent Name',
         selector: row => row.PARENT_NAME,
         sortable: true,
         width: '17%',
      },
      {
         name: 'Child Name',
         selector: row => row.CHILD_NAME,
         sortable: true,
         width: '17%',
      },
      {
         name: 'Parent Email',
         selector: row => row.PARENT_EMAIL,
         sortable: true,
         width: '25%',
      },
      {
         name: 'Date',
         selector: row => row.SELECTED_DATE,
         sortable: true,
         width: '15%',
      },
      {
         name: 'Time',
         selector: row => row.SELECTED_TIME,
         sortable: true,
         width: '10%',
      },
      {
         name: 'Consult Now',
         // selector: 'consult_now',
         width: '15%',
         cell: row => <button className='view-more-button' onClick={handleConsultation(row.P_ID, row.C_ID)}> Consult Now</button>
      },
   ];
   
   useEffect(() => {
      const fetchConsultations = async () => {
         try {
            const response = await fetch(`${URL}/consultations/data?id=${localData.ID}`);
            const tempData = await response.json();
            const data = tempData.map(transformToUppercase);
            setConsultations(data);
           
         } catch (error) {
            setConsultations([]);
         }
      };
      
      fetchConsultations();
   }, []);
   
   const data = consultations;
   
   const handleConsultation = (p_id, c_id) => () => {
      navigate('/consultation', { state: { p_id, c_id } });
   };

   const customStyles = {
      header: {
         style: {
            fontFamily: 'New Amsterdam, sans- serif',
            fontSize: '45px',
            // fontWeight: 'bold',
            textAlign: 'center',
            justifyContent: 'start',
            backgroundColor: '#B6D7E6',
         },
      },
      headRow: {
         style: {
            backgroundColor: '#B6D7E6',
         },
      },
      rows: {
         style: {
            fontFamily: 'Oswald, sans- serif',
            fontSize: '16px',
            color: '#666',
            backgroundColor: '#ffffff',
            '&:nth-of-type(odd)': {
               backgroundColor: '#f7f7f7',
            },
         },
      },
      headCells: {
         style: {
            fontFamily: 'Oswald, sans- serif',
            fontSize: '18px',
            color: '#333', // Change text color
            textAlign: 'center',
            justifyContent: 'center',
         },
      },
      cells: {
         style: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px',
            color: '#666', // Change text color
            textAlign: 'center', // Center the text
         },
      },
      pagination: {
         style: {
            fontFamily: 'Oswald, sans- serif',
            fontSize: '16px',
            color: '#333',
            backgroundColor: '#f9f9f9',
            borderTop: '1px solid #ddd',
            padding: '10px',
         },
         pageButtonsStyle: {
            borderRadius: '50%',
            height: '40px',
            width: '40px',
            padding: '8px',
            margin: '0 5px',
            cursor: 'pointer',
            transition: '0.3s',
            color: '#333',
            fill: '#333',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            '&:hover': {
               backgroundColor: '#f0f0f0',
            },
            '&:focus': {
               outline: 'none',
               backgroundColor: '#e0e0e0',
            },
         },
      },
   };

   return (
      <div>
         <div className='doctor-consultation-list'>

            <div className="consult-list-table">
               <DataTable
                  className='table'
                  title="Consultation List"
                  columns={columns}
                  data={data}
                  fixedHeader
                  pagination
                  responsive
                  highlightOnHover
                  customStyles={customStyles}
               />
            </div>
            <img src={DoctorConsultImg} alt="DoctorConsultation" />
         </div>
      </div>
   );
}

export default DoctorConsultation;