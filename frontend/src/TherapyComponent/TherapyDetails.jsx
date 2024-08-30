import './TherapyDetails.css';
import 'boxicons/css/boxicons.min.css';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TherapyDetails from '../img/TherapyDetails.svg';
import OrgCard from './OrgCard';


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
        console.log('Fetching therapy data', data[0]);
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



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className='therapy-details'>
        <div className="therapy-details-content">
          <div className="details-of-therapy">
            <h2>{therapyData.THERAPY_TYPE}</h2>
            <p>{therapyData.THERAPY_DESCRIPTION}</p>
          </div>
          <div className="availability">
            <h3>Currently available in:</h3>
            <div className="org-container">
              {therapyOrgData.map((org) => (
                <OrgCard product={org} />
              ))}
            </div>
          </div>
        </div>
        <img src={TherapyDetails} alt="TherapyDetails" className="TherapyDetails" />
      </div>
    </div>
  );
};

export default TherapyDetail;
