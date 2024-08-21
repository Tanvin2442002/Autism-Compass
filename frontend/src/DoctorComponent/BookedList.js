import React, { useEffect, useState } from 'react';
import './BookedList.css'; 
import Navbar from '../Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const BookedList = () => {
  const [consultations, setConsultations] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [consultationToDelete, setConsultationToDelete] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const localData = JSON.parse(localStorage.getItem('USER'));

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/consultations/data?id=${localData.ID}&type=${localData.TYPE}`);

        const data = await response.json();

        if (Array.isArray(data)) {
          setConsultations(data);
          consultations.forEach((consultation) => {
            console.log(consultation);
          });
        } else {
          setConsultations([]);
        }
      } catch (error) {
        console.error('Error fetching consultations:', error);
        setConsultations([]);
      }
    };

    fetchConsultations();
    console.log('Consultations:', consultations);
  }, []);

  const handleDelete = async () => {
    const { P_ID, H_ID, C_ID } = consultationToDelete;
    console.log('Deleting consultation:', consultationToDelete);
    try {
      const response = await fetch(`http://localhost:5000/consultations/delete?P_ID=${P_ID}&H_ID=${H_ID}&C_ID=${C_ID}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        setConsultations(consultations.filter(consultation => !(consultation.P_ID === P_ID && consultation.H_ID === H_ID && consultation.C_ID === C_ID)));
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error deleting consultation:', error);
      setShowConfirmation(false);
    }
  };

  const handleDeleteClick = (consultation) => {
    setConsultationToDelete(consultation);
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="booked-list-container">
      <Navbar />
      <div className="body-container">
        <div className="header-container">
          <h1>Booked Consultations</h1>
          <p>Here are your booked consultations.</p>
        </div>
        <div className="card-wrapper">
          {consultations.length > 0 ? consultations.map((consultation) => (
            <div key={`${consultation.P_ID}-${consultation.H_ID}-${consultation.C_ID}`} className="card-item">
              <i className="card-icon bx bx-user-circle"></i>
              <h2>Dr. {consultation.DOCTOR_NAME}</h2>
              <p>{consultation.FIELD_OF_SPEC}</p>
              <p>{consultation.NAME_OF_HOSPITAL}</p>
              <p className="label-square">Date: {consultation.SELECTED_DATE}</p>
              <p className="label-square">Time: {consultation.SELECTED_TIME}</p>
              <p className="label-square">Patient's Name: {consultation.CHILD_NAME}</p>
              <button className="delete-button" onClick={() => handleDeleteClick(consultation)}>
                <FontAwesomeIcon icon={faTrashAlt} size="lg" style={{ color: '#e74c3c' }} />
                <span className="delete-label">Delete</span>
              </button>
            </div>
          )) : (
            <p>No consultations found.</p>
          )}
        </div>


        {showConfirmation && (
          <div className="confirmation-dialog">
            <div className="confirmation-dialog-content">
              <p>Are you sure you want to delete this?</p>
              <button className="confirm-btn" onClick={handleDelete}>Yes</button>
              <button className="cancel-btn" onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        )}

        {showPopup && (
          <div className="delete-popup">
            <p>One booking has been deleted.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedList;
