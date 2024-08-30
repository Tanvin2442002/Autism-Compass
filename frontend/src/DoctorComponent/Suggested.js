import React, { useEffect, useState } from 'react';
import './Suggested.css';
import Navbar from '../Navbar';
import suggestion from "../img/suggestion.svg";


const SuggestedList = () => {
  const [suggestions, setSuggestions] = useState([]);
  const userData = JSON.parse(localStorage.getItem('USER'));
  const [isParent, setIsParent] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/suggests/data?id=${userData.ID}&type=${userData.TYPE}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setSuggestions(data);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
    setIsParent(userData.TYPE === "PARENT");
  }, []);

  return (
    <div className="suggested-list-container">
      <Navbar />
      <div className="main-content-suggestion">
        <div className='suggestion-data'>
          <h2>Suggestions from Your Doctors</h2>
          <div className="suggestions-table-container">
            <table className="suggestions-table">
              <thead>
                <tr>
                  {userData.TYPE === "PARENT" && (
                    <th>CHILD’S NAME</th>
                  )}
                  <th>DOCTOR’S NAME</th>
                  <th>SUGGESTED THERAPY</th>
                  <th>FEEDBACK</th>
                </tr>
              </thead>
              <tbody>
                {suggestions.length > 0 ? suggestions.map((suggestion, index) => (
                  <tr key={`${suggestion.CHILD_NAME}-${suggestion.HEALTH_PROFESSIONAL_NAME}-${suggestion.THERAPY_TYPE}`}>
                    {userData.TYPE === "PARENT" && (
                      <td>{index + 1}. {suggestion.CHILD_NAME}</td>
                    )}
                    <td>Dr. {suggestion.HEALTH_PROFESSIONAL_NAME}</td>
                    <td>{suggestion.THERAPY_TYPE}</td>
                    <td>{suggestion.FEEDBACK ? suggestion.FEEDBACK : "No feedback provided."}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4">No suggestions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <img src={suggestion} alt="suggestion" className="suggestion-svg" />  {/* Adjusted SVG Position */}
      </div>
    </div>
  );
};

export default SuggestedList;
