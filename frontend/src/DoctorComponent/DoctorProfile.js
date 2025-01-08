import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './DoctorProfile.css';
import { useLocation } from 'react-router-dom';
import docProfile from '../img/docProfile.svg';

const URL = process.env.REACT_APP_API_URL;

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [docAddress, setDocAddress] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const doctorId = params.get('id');
  const navigate = useNavigate();
  
  const transformToUppercase = (data) => {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key.toUpperCase(), value])
    );
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`${URL}/doctor/detail?id=${doctorId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const tempData = await response.json();
        const data = tempData.map(transformToUppercase);
        setDoctor(data[0]);

        await fetchGenderData(data[0].NAME);
        const add = data[0].ADDRESS.street + ", " + data[0].ADDRESS.city + "- " + data[0].ADDRESS.postal_code;
        setDocAddress(add);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching doctor details:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchGenderData = async (doctorName) => {
      const name = doctorName.split(' ')[0];
      try {
        const genderResponse = await fetch(`https://api.genderapi.io/api/?name=${encodeURIComponent(name)}&key=667faf277a781c44944e8b13`);
        const genderData = await genderResponse.json();
        const data = genderData.gender;
        if (genderData.status && genderData.gender !== 'null') {
          setDoctor(prevDoctor => ({
            ...prevDoctor,
            GENDER: data
          }));
        }
      } catch (err) {
        console.error("Error fetching gender data:", err);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const handleBookingRedirect = () => {
    navigate(`/booking/doc?DOC_ID=${doctorId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='doc-profile-temp'>
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <Navbar />
      <div className="doctor-profile-doc">
        <div className='doc-info'>
          <h1>Doctor's Profile</h1>
          <div className='all-info-doc'>
            <div className='avatar'>
              <img src={`https://avataaars.io/?avatarStyle=Circle&topType=${doctor.GENDER === 'male' ? 'ShortHairShortCurly' : 'LongHairStraight'}&accessoriesType=Blank&hairColor=${doctor.GENDER === 'male' ? 'Brown' : 'Blonde'}&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light`} alt="Profile" className="doctor-list-avatar" />
              <div className="profile-info">
                <h1>Dr. {doctor.NAME}</h1>
              </div>
            </div>
            <div className="profile-form-group">
              <label>Email Address</label>
              <label>:</label>
              <input
                type="text"
                name="EMAIL"
                placeholder="Email Address"
                value={doctor.EMAIL}
              // onChange={handleChange}
              />
            </div>
            <div className="profile-form-group">
              <label>Contact Number</label>
              <label>:</label>
              <input
                type="text"
                name="CONTACT_NO"
                placeholder="Enter contact number"
                value={doctor.CONTACT_NO}
              // onChange={handleChange}
              />
            </div>
            <div className="profile-form-group">
              <label>Degree</label>
              <label>:</label>
              <input
                type="text"
                name="DEGREE"
                placeholder="Degree"
                value={doctor.DEGREE}
              // onChange={handleChange}
              />
            </div>
            <div className="profile-form-group">
              <label>Field of Specialization</label>
              <label>:</label>
              <input
                type="text"
                name="FIELD_OF_SPEC"
                placeholder="Field of specialization"
                value={doctor.FIELD_OF_SPEC}
              // onChange={handleChange}
              />
            </div>
            <div className="profile-form-group">
              <label>Name of Hospital</label>
              <label>:</label>
              <input
                type="text"
                name="STREET"
                placeholder="Enter street"
                value={doctor.NAME_OF_HOSPITAL}
              // onChange={handleChange}
              />
            </div>
            <div className="profile-form-group">
              <label>Address of Hospital</label>
              <label>:</label>
              <input
                type="text"
                name="STREET"
                placeholder="Enter street"
                value={docAddress}
              />
            </div>

            <div className="profile-form-group">
              <label>Visit Time</label>
              <label>:</label>
              <input
                type="text"
                name="CITY"
                placeholder="Enter city"
                value={doctor.VISIT_TIME}
              // onChange={handleChange}
              />
            </div>
            <div className="book-now-button">
              <button className='ifrit-button'
                onClick={handleBookingRedirect}
                style={{ backgroundColor: 'red' }}
              >
                <span className="button-text">Book Now</span>
              </button>
            </div>
          </div>
        </div>
        <div className='doc-background'>
          <img src={docProfile} alt="Doctor Profile" />
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
