import './TherapyDetails.css';
import 'boxicons/css/boxicons.min.css';
import axios from 'axios';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TherapyDetails from '../img/TherapyDetails.svg';
import OrgCard from './OrgCard';
import LoadingAnimation from '../LoadingAnimation';
import RevealLeftToRight from '../RevealLeftToRight';
import RevealRightToLeft from '../RevealRightToLeft';


const TherapyDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const therapyId = params.get('type');

  const [therapyData, setTherapyData] = useState(null);
  const [therapyOrgData, setTherapyOrgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ans, setAns] = useState('');
  const [loadingTherapyDetails, setLoadingTherapyDetails] = useState(false);

  useEffect(() => {
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

  const generateTherapyDetails = async () => {
    setLoadingTherapyDetails(true); // Start loading animation
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDYuRJ9qvb47Q0Jspl1g3Ey4jNrRHTUe9g',
        data: {
          contents: [
            {
              parts: [
                { text: "Explain more about " + therapyData.THERAPY_TYPE + " how it works" }
              ]
            }
          ]
        }
      });

      setAns(response.data.candidates[0].content.parts[0].text.replace(/\*/g, ''));
    } catch (error) {
      console.error("Error generating disorder details", error);
    } finally {
      setLoadingTherapyDetails(false);
    }
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className='therapy-details'>
        <div className="therapy-details-content">
          <RevealLeftToRight>
            <div className="details-of-therapy">
              <h2>{therapyData.THERAPY_TYPE}</h2>
              <p>{therapyData.THERAPY_DESCRIPTION}</p>
              <button className='view-more-button' onClick={generateTherapyDetails}>
                Want to know more about this therapy
              </button>
              <div className='disorder-item-details'>
                {loadingTherapyDetails ? (
                  <LoadingAnimation />
                ) : (
                  ans.length > 0 && (
                    <textarea className='answer' value={ans} readOnly />
                  )
                )}
              </div>
            </div>
          </RevealLeftToRight>
          <RevealLeftToRight>
            <div className="availability">
              <h3>Currently available in:</h3>
              <div className="org-container">
                {therapyOrgData.map((org) => (
                  <OrgCard product={org} key={org.id} />
                ))}
              </div>
            </div>
          </RevealLeftToRight>
        </div>
        <RevealRightToLeft>
          <div className="therapy-details-image">
            <img src={TherapyDetails} alt="TherapyDetails" className="TherapyDetails" />
          </div>
        </RevealRightToLeft>
      </div>
    </div>
  );
};

export default TherapyDetail;
