import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'boxicons/css/boxicons.min.css';
import './BookingDoc.css';

const BookingDoc = () => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [userDetails, setUserDetails] = useState([]); // Array for multiple children
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const doctorId = params.get('DOC_ID'); // Fetch doctor ID from URL

  const localData = JSON.parse(localStorage.getItem('USER')); // Retrieve logged-in user details

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/physician/detail?H_ID=${doctorId}`);
        const data = await response.json();
        setDoctorDetails(data[0]);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        setError('Failed to fetch doctor data.');
      } finally {
        setLoading(false);
      }
    };

    const fetchUserDetails = async () => {
      try {
        let response;
        // If logged in as parent, fetch child data
        if (localData.TYPE === 'PARENT') {
          response = await fetch(`http://localhost:5000/physician/child/data?P_ID=${localData.ID}`);
        }
        // If logged in as child, fetch parent data
        else if (localData.TYPE === 'CHILD') {
          response = await fetch(`http://localhost:5000/physician/parent/data?C_ID=${localData.ID}`);
        }

        const data = await response.json();
        setUserDetails(data); // Store the entire array
        setSelectedChildId(data[0]?.C_ID); // Set the first child as default
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data.');
      }
    };

    fetchDoctorDetails();
    fetchUserDetails();
  }, []);

  const handleChildSelection = (childId) => {
    setSelectedChildId(childId); // Select the child
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    const bookingData = {
      P_ID: localData.TYPE === 'PARENT' ? localData.ID : userDetails[0].P_ID,  // Parent ID
      C_ID: selectedChildId,  // Selected Child ID
      H_ID: doctorId,  // Doctor (Health Professional) ID
    };

    console.log('Booking data:', bookingData);

    try {
      const response = await fetch('http://localhost:5000/booking/physician', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      if (response.ok) {
        toast.success('Booking Successful!', {
          position: 'top-right',
          autoClose: 2500,
        });
      } else {
        toast.error('Booking Failed!', {
          position: 'top-right',
          autoClose: 2500,
        });
      }
    } catch (error) {
      toast.error('An error occurred!', {
        position: 'top-right',
        autoClose: 2500,
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='booking-container'>
      <ToastContainer />
      <Navbar />

      {/* Display Child Info at the top */}
      {localData.TYPE === 'PARENT' && userDetails.length > 0 && (
        <div className='child-info-wrapper'>
          {userDetails.map((child) => (
            <div className='child-card' key={child.C_ID} onClick={() => handleChildSelection(child.C_ID)}>
              <i className="bx bx-user-circle child-icon"></i>
              <h2>{child.CHILD_NAME}</h2>
              <p>Email: {child.CHILD_EMAIL}</p>
            </div>
          ))}
        </div>
      )}

      {/* Consultation form below child info */}
      <div className='booking-header'>
        <h1>Book Consultation with Dr. {doctorDetails && doctorDetails.NAME}</h1>

        <div className='form-wrapper'>
          <div className='input-box'>
            <label htmlFor='consultation-date'>Select Date:</label>
            <input type='date' id='consultation-date' required />
          </div>

          <div className='input-box'>
            <label htmlFor='consultation-time'>Select Time:</label>
            <input type='time' id='consultation-time' required />
          </div>
        </div>

        <div className='confirm-btn-wrapper'>
          <button type='submit' className='confirm-btn' onClick={handleConfirmBooking}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDoc;
