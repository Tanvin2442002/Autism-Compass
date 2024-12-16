import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";


const Card = ({ product }) => {

   const location = useLocation();
   const params = new URLSearchParams(location.search);
   const therapyId = params.get('type');
   const navigate = useNavigate();

   // find current page url
   console.log('Current page URL:', window.location.href);
   // if url end with ord then book now button willnot be shown

   const url = window.location.href;
   const isBookingPage = url.endsWith('org');
   console.log('Is booking page:', isBookingPage);

   const handleClick = (ORG_ID) => () => {
      console.log('Book now clicked');
      console.log('ORG_ID:', ORG_ID);
      console.log('Therapy ID:', therapyId);
      navigate(`/therapy/booking?TH_ID=${therapyId}&THO_ID=${ORG_ID}`);
   };

   console.log('Product:', product);

   return (
      <StyledWrapper>
         <div className="card">
            <div className="card-content">
               <p className="card-title">{product.NAME.slice(0, 35)}</p>
               <div className="individual-details">
                  <FontAwesomeIcon icon={faPhone} size="lg" style={{ color: "#662E26" }} />
                  <p className="small-desc">{product.CONTACT_NO}</p>
               </div>
               <div className="individual-details">
                  <FontAwesomeIcon icon={faEnvelope} size="lg" style={{ color: "#662E26" }} />
                  <p className="small-desc">{product.EMAIL}</p>
               </div>
               <div className="individual-details">
                  <FontAwesomeIcon icon={faLocationDot} size="lg" style={{ color: "#662E26" }} />
                  <p className="small-desc">{product.STREET} {product.CITY}</p>
               </div>
               {!isBookingPage && (
                  <button className="view-more-button" onClick={handleClick(product.THO_ID)}>Book Now</button>
               )}
            </div>
         </div>
      </StyledWrapper>
   );
};

const StyledWrapper = styled.div`


.card {
    border: 1.4px solid #602f29;
  display: block;
  max-width: 230px;
  max-height: 330px;
  background-color: #f2f8f9;
  border-radius: 10px;
  padding: 1em 1.2em;
  margin: 0px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
    background: #9FC0D2;
  font-family: Arial, Helvetica, sans-serif;
}

.card:before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0px;
  right: 0px;
background: #5290B0;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  transform: scale(1);
  transform-origin: 50% 50%;
  transition: transform 0.35s ease-out;
}

.card:hover:before {
  transform: scale(28);
}

.card:hover .small-desc {
  transition: all 0.5s ease-out;
  color: #662E26
}

.card:hover .card-title {
  transition: all 0.5s ease-out;
  color: #21404f;
}


.card-content {
    margin: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    text-wrap: prettify;
    height: 100%;
    width: 100%;

    // border: 0.5px solid red;
} 

.card-title {
  color: #262626;
  font-size: 1.4em;
  line-height: normal;
  font-family: 'Roboto Condensed', sans-serif;
  text-align: center;
  text-transform: uppercase;
  text-wrap: prettify;
  font-weight: 700;
  margin-bottom: 0.5em;
  color: #455a64;
}
.small-desc {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5em;
  color: #452c2c;
  font-family: 'Roboto Condensed', sans-serif;
}

.individual-details{
   width: 100%;
   height: 200px
   display: grid;
   grid-template-columns: 1fr 3fr;
}

.card-content .view-more-button {
    cursor: pointer;
    padding: 10px 10px;
    border: unset;
    border-radius: 5px;
    color: #662E26;
    font-family: 'Roboto Condensed', sans-serif;
    word-spacing: 2px;
    letter-spacing: 1px;
    z-index: 1;
    background-color: #ffffffac;
    position: relative;
    font-weight: 700;
    font-size: 13px;
    -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    transition: all 250ms;
    overflow: hidden;
}

.card-content .view-more-button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    border-radius: 5px;
    background-color: #662E26;
    z-index: -1;
    -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    transition: all 250ms
}

.card-content .view-more-button:hover {
    color: #e8e8e8;
}

.card-content .view-more-button:hover::before {
    width: 100%;
}


`;

export default Card;
