import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate for navigation
import Navbar from '../Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'boxicons/css/boxicons.min.css';
import './BookingDoc.css';

const BookingDoc = () => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [userDetails, setUserDetails] = useState([]); 
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); // For redirecting to BookedList.js
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
        if (localData.TYPE === 'PARENT') {
          response = await fetch(`http://localhost:5000/physician/child/data?P_ID=${localData.ID}`);
        } else if (localData.TYPE === 'CHILD') {
          response = await fetch(`http://localhost:5000/physician/parent/data?C_ID=${localData.ID}`);
        }

        const data = await response.json();
        setUserDetails(data); // Store the entire array
        setSelectedChildId(data.C_ID); // Set the child ID directly for child login
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data.');
      }
    };

    fetchDoctorDetails();
    fetchUserDetails();
  }, []);

  const handleChildSelection = (childId) => {
    setSelectedChildId(childId);
    console.log('Selected Child ID:', childId);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    const bookingData = {
      H_ID: doctorId,  // Doctor (Health Professional) ID
      C_ID: localData.TYPE === 'PARENT' ? selectedChildId : localData.ID,  // Selected Child ID or Child's ID directly
      BOOKING_DATE: document.getElementById('consultation-date').value,  // Selected Date
      BOOKING_TIME: document.getElementById('consultation-time').value,  // Selected Time
    };

    if (localData.TYPE === 'PARENT') {
      bookingData.P_ID = localData.ID;  // Parent ID for parent login
    }

    console.log('Booking data:', bookingData);

    try {
      console.log(bookingData);
      const response = await fetch('http://localhost:5000/physician', {
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
        const confirmBtn = document.querySelector('.confirm-btn');
        confirmBtn.style.backgroundColor = 'green'; 
        confirmBtn.textContent = 'Booking Confirmed';
        confirmBtn.classList.add('success'); 
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

  const handleBookingUpdatesClick = () => {
    navigate('/BookedList');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='booking-container'>
      <ToastContainer />
      <Navbar />

      {localData.TYPE === 'PARENT' && userDetails.length > 0 && (
        <div className='child-info-wrapper'>
          {userDetails.map((child) => (
            <div
              className={`child-card ${selectedChildId === child.C_ID ? 'selected' : ''}`}
              key={child.C_ID}
              onClick={() => handleChildSelection(child.C_ID)}
            >
              <i className="bx bx-user-circle child-icon"></i>
              <h2>{child.CHILD_NAME}</h2>
              <p>Email: {child.CHILD_EMAIL}</p>
            </div>
          ))}
        </div>
      )}

      <div className='booking-header'>
        <h1>Book Consultation with Dr. {doctorDetails && doctorDetails.NAME}</h1>

        <div className='form-wrapper'>
          <div className='input-box'>
            <label htmlFor='consultation-date'>Select Date:</label>
            <input
              className='booking-input'
              type='date'
              id='consultation-date'
              required />
          </div>

          <div className='input-box'>
            <label htmlFor='consultation-time'>Select Time:</label>
            <input
              className='booking-input'
              type='time'
              id='consultation-time' required />
          </div>
        </div>

        <div className='confirm-btn-wrapper'>
          <button type='submit' className='confirm-btn' onClick={handleConfirmBooking}>
            Confirm Booking
          </button>
        </div>
        <button className='booking-updates-btn' onClick={handleBookingUpdatesClick}>
          See Booking Updates 
        </button>
      </div>
    </div>
  );
};

export default BookingDoc;



