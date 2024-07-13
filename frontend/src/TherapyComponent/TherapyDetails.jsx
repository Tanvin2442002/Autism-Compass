import './TherapyDetails.css';
import 'boxicons/css/boxicons.min.css';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TherapyDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const therapyId = params.get('type');

  const [therapyData, setTherapyData] = useState(null);
  const [therapyOrgData, setTherapyOrgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Therapy ID:', therapyId);
    const fetchTherapyData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/therapy/Detail?type=${therapyId}`);
        const data = await response.json();
        setTherapyData(data[0]); // Assuming the API returns an array
      } catch (error) {
        console.error('Error fetching therapy data:', error);
        setError('Failed to fetch therapy data.');
      } finally {
        setLoading(false);
      }
    };

    console.log(therapyId);

    const fetchTherapyOrgData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/therapy/org?type=${therapyId}`);
        const data = await response.json();
        setTherapyOrgData(data);
      } catch (error) {
        console.error('Error fetching therapy data:', error);
        setError('Failed to fetch therapy data.');
      } finally {
        setLoading(false);
      }
    };

    if (therapyId) {
      fetchTherapyData();
      fetchTherapyOrgData();
    }
  }, [therapyId]);

  const handleBooking = (ORG_ID) => {
    console.log('Book now clicked');
    console.log('ORG_ID:', ORG_ID);
    console.log('Therapy ID:', therapyId);
    navigate(`/therapy/book?TH_ID=${therapyId}&THO_ID=${ORG_ID}`);
    // Handle booking logic here
    // const userData = JSON.parse(localStorage.getItem('USER'));

    // const BookingDetails = {
    //   THO_ID: ORG_ID,
    //   USER_ID: userData.ID,
    //   USER_TYPE: userData.TYPE,
    //   TH_ID: therapyId,
    //   // today date
    //   BOOKING_DATE: new Date().toISOString().split('T')[0],
    // };

    // const response = await fetch('http://localhost:5000/therapy/book', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(BookingDetails),
    // });

    // const data = await response.json();
    // console.log(data);
    // // if response is ok then show success message
    // // else show error message
    // if (response.ok) {
    //   alert('Booking successful');
    // } else {
    //   alert('Booking failed');
    // }

    // console.log('Book now clicked');
    // console.log('ORG_ID:', ORG_ID);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="therapy-details">
      <Navbar />
      <div className="therapy-details-content">
        <h1>Therapy Details</h1>
        <div className="search-box">
          <input type="text" placeholder="Search therapies..." required />
          <i className='bx bx-search'></i>
        </div>
        {therapyData ? (
          <div className="details">
            <h2>{therapyData.THERAPY_TYPE}</h2>
            <p>{therapyData.THERAPY_DESCRIPTION}</p>
          </div>
        ) : (
          <p>Therapy details not found.</p>
        )}
        <div className="availability">
          <h3>Currently available in:</h3>
          <div className="org-container">
            {therapyOrgData.map((org) => (
              <div key={org.ORG_ID} className="org-wrapper">
                <div className="org-box">
                  <p>NAME: {org.NAME}</p>
                  <p>CONTACT NO: {org.CONTACT_NO}</p>
                  <p>EMAIL: {org.EMAIL}</p>
                  <p>CITY: {org.CITY}</p>
                  <p>STREET: {org.STREET}</p>
                  <p>POSTAL_CODE: {org.POSTAL_CODE}</p>
                  <button
                    className="book-now"
                    value={org.ORG_ID}
                    onClick={() => handleBooking(org.THO_ID, therapyId)}>
                    Book now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapyDetail;
