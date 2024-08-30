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
                  <p className="small-desc">{product.EMAIL} BDT</p>
               </div>
               <div className="individual-details">
                  <FontAwesomeIcon icon={faLocationDot} size="lg" style={{ color: "#662E26" }} />
                  <p className="small-desc">{product.STREET} {product.CITY}</p>
               </div>
               <button className="view-more-button" onClick={handleClick(product.THO_ID)}>BOOK NOW</button>
            </div>
         </div>
      </StyledWrapper>
   );
};

const StyledWrapper = styled.div`


.card {
    border: 1.4px solid #602f29;
  display: block;
//   position: relative;
  max-width: 230px;
  max-height: 330px;
  background-color: #f2f8f9;
  border-radius: 10px;
  padding: 1em 1.2em;
  margin: 0px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
//   background: linear-gradient(to bottom, #c3e6ec, #a7d1d9);
    background: #9FC0D2;
  font-family: Arial, Helvetica, sans-serif;
}

.card:before {
  content: '';
  position: absolute;
  z-index: -1;
  top: -16px;
  right: -16px;
//   background: linear-gradient(135deg, #364a60, #384c6c);
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

`;

export default Card;
