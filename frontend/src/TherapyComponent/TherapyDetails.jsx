import './TherapyDetails.css';
import 'boxicons/css/boxicons.min.css';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TherapyDetail = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const therapyType = params.get('type');

  const [therapyData, setTherapyData] = useState(null);
  const [therapyOrgData, setTherapyOrgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTherapyData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/therapy/Detail?type=${therapyType}`);
        const data = await response.json();
        setTherapyData(data[0]); // Assuming the API returns an array
      } catch (error) {
        console.error('Error fetching therapy data:', error);
        setError('Failed to fetch therapy data.');
      } finally {
        setLoading(false);
      }
    };

    console.log(therapyType);

    const fetchTherapyOrgData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/therapy/org?type=${therapyType}`);
        const data = await response.json();
        setTherapyOrgData(data);
      } catch (error) {
        console.error('Error fetching therapy data:', error);
        setError('Failed to fetch therapy data.');
      } finally {
        setLoading(false);
      }
    };

    if (therapyType) {
      fetchTherapyData();
      fetchTherapyOrgData();
    }
  }, [therapyType]);


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
                  <button className="book-now">Book now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <button className="btn">Back</button> */}
      </div>
    </div>
  );
};

export default TherapyDetail;
