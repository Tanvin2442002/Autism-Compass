import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import './DoctorProfile.css';
import { useLocation } from 'react-router-dom';

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [childList, setChildList] = useState([]); // For holding list of children IDs
  const [showChildSelection, setShowChildSelection] = useState(false); // For showing child ID pop-up list
  const [noChildrenMessage, setNoChildrenMessage] = useState(false); // To show 'No child is registered' message
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const doctorId = params.get('id');

  // Get user data from local storage
  const userData = JSON.parse(localStorage.getItem('USER')); // This will get the ID and TYPE

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/doctor/detail?id=${doctorId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDoctor(data[0]);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching doctor details:", err); 
      } finally {
        setLoading(false);
      }
    };

    if (userData.TYPE === 'PARENT') {
      // Fetch the list of children for this parent
      const fetchChildren = async () => {
        try {
          const childrenResponse = await fetch(`http://localhost:5000/parent/children?id=${userData.ID}`);
          const childrenData = await childrenResponse.json();
          console.log("Children fetched: ", childrenData); // Debugging log
          setChildList(childrenData); // Assuming this returns an array of child IDs
        } catch (error) {
          console.error("Error fetching children:", error);
        }
      };
      fetchChildren();
    }

    fetchDoctor();
  }, [id, userData]);

  const handleBooking = async (childId = null) => {
    // Prepare the consult details (P_ID, H_ID, C_ID)
    const consultData = {
      P_ID: userData.TYPE === 'PARENT' ? userData.ID : null, // Parent ID from localStorage
      H_ID: doctorId,
      C_ID: userData.TYPE === 'CHILD' ? userData.ID : childId, // Child ID from localStorage or selected
    };

    // Add consult to database
    try {
      const response = await fetch('http://localhost:5000/consult/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consultData),
      });
      if (response.ok) {
        setIsBooked(true); // Change button appearance to "Booked"
        setShowChildSelection(false); // Hide child selection pop-up
      } else {
        throw new Error('Failed to book consultation');
      }
    } catch (err) {
      console.error('Booking error:', err);
    }
  };

  const handleParentBooking = () => {
    console.log("Current childList: ", childList); // Debugging log
    if (childList.length > 0) {
      setShowChildSelection(true); // Show child ID pop-up list
    } else {
      setNoChildrenMessage(true); // Show "No child is registered" pop-up
    }
  };

  const closePopup = () => {
    setNoChildrenMessage(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="doctor-profile-background">
      <Navbar />
      <div className="doctor-profile">
        <h1>Doctor's Profile</h1>
        {doctor && (
          <div className="profile-container">
            <img src={`https://avataaars.io/?avatarStyle=Circle&topType=${doctor.GENDER === 'male' ? 'ShortHairShortCurly' : 'LongHairStraight'}&accessoriesType=Blank&hairColor=${doctor.GENDER === 'male' ? 'Brown' : 'Blonde'}&facialHairType=Blank&clotheType=Doctor&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light`} alt="Profile" className="doctor-profile-avatar" />
            <h2 className="doctor-name">Dr. {doctor.NAME}</h2>
            <div className="info-group">
              <p className="attribute">Field of Specialization:</p>
              <div className="info-box slide-in">{doctor.FIELD_OF_SPEC}</div>
            </div>
            <div className="info-group">
              <p className="attribute">Degree:</p>
              <div className="info-box slide-in">{doctor.DEGREE}</div>
            </div>
            <div className="info-group">
              <p className="attribute">Contact No.:</p>
              <div className="info-box slide-in">{doctor.CONTACT_NO}</div>
            </div>
            <div className="info-group">
              <p className="attribute">Email:</p>
              <div className="info-box slide-in">{doctor.EMAIL}</div>
            </div>
            <div className="info-group">
              <p className="attribute">Hospital:</p>
              <div className="info-box slide-in">{doctor.NAME_OF_HOSPITAL}</div>
            </div>
            <div className="info-group">
              <p className="attribute">Visit Time:</p>
              <div className="info-box slide-in">{doctor.VISIT_TIME}</div>
            </div>
            <div className="info-group">
              <p className="attribute">Address:</p>
              <div className="info-box slide-in">
                {doctor.ADDRESS.CITY}, {doctor.ADDRESS.STREET}, {doctor.ADDRESS.POSTAL_CODE}
              </div>
            </div>

            {/* Pop-up message above the button */}
            {noChildrenMessage && (
              <div className="no-children-popup" style={{ marginBottom: '10px' }}>
                <p>No child is registered.</p>
                <button onClick={closePopup}>Close</button>
              </div>
            )}

            {/* Book Now button behavior for Parent and Child */}
            {userData.TYPE === 'PARENT' ? (
              <>
                <button
                  className={`book-now-button ${isBooked ? 'booked' : ''}`}
                  onClick={handleParentBooking}
                  style={{ backgroundColor: isBooked ? 'green' : 'red' }}
                >
                  <span className="button-text">{isBooked ? 'Booked!' : 'Book Now'}</span>
                </button>
                {showChildSelection && (
                  <div className="child-list">
                    <h4>Select a Child to Book Consultation:</h4>
                    {childList.map((childId) => (
                      <button
                        key={childId}
                        onClick={() => handleBooking(childId)}
                        className="child-id-button"
                      >
                        {childId}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <button
                className={`book-now-button ${isBooked ? 'booked' : ''}`}
                onClick={() => handleBooking()}
                style={{ backgroundColor: isBooked ? 'green' : 'red' }}
              >
                <span className="button-text">{isBooked ? 'Booked!' : 'Book Now'}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
