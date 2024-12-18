import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays,faPhoneVolume, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faTruck,faHashtag,faCheck } from "@fortawesome/free-solid-svg-icons";

const OrderCard2 = ({ product }) => {
  const navigate = useNavigate();
  const [pending, setPending] = React.useState(false);
  const cmpdeliveryDate = new Date(product.DELIVERY_DATE);
  // console.log("Delivery Date:", cmpdeliveryDate);
  const deliveryDate = product.DELIVERY_DATE.slice(0, 10);
  // console.log("product:", product);

  useEffect(() => {
    const currentDate = new Date();
    // console.log("Current Date:", currentDate);
    if (currentDate < cmpdeliveryDate) {
      setPending(false);
    } else {
      setPending(true);
    }
    // console.log("Pending:", pending);
  }, [cmpdeliveryDate]);

  const handleDeliveryDetails = () => {
    // console.log("Delivery Details:", product);
    navigate(`/products/delivery?ORDER_ID=${product.B_ID}`);
  };
  // console.log("Product:", product);
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card-details">
          <h1 className="text-title">{product.B_ID}</h1>
          <div className="card-details-info">
            <FontAwesomeIcon icon={faCalendarDays} beatFade />
            <p>{deliveryDate}</p>
          </div>
          <div className="card-details-info">
          <FontAwesomeIcon icon={faTruck} />
            <p>{product.NAME}</p>
          </div>
          <div className="card-details-info">
          <FontAwesomeIcon icon={faPhoneVolume} />
            <p>{product.CONTANCT_NO}</p>
          </div>
          <div className="card-details-info">
          <FontAwesomeIcon icon={faHashtag} />
            <p>{product.TOTAL_QUANTITY}</p>
          </div>
          {pending ? (
            <div className="card-details-info">
           <FontAwesomeIcon icon={faCheck} />
              <p>Deliverd</p>
            </div>
          ):(
            <div className="card-details-info">
            <FontAwesomeIcon icon={faSpinner} spinPulse/>
              <p>In Process</p>
             </div>
          )}
          <p className="card-pay">PAY: {product.AMOUNT}$</p>
        </div>
        <button className="card-button" onClick={handleDeliveryDetails}>
          More info
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=New+Amsterdam&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=New+Amsterdam&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=New+Amsterdam&family=Noto+Sans+Hanunoo&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap");

  .card {
    width: 190px;
    height: 254px;
    border-radius: 20px;
    background: #e0e0e0;
    position: relative;
    padding: 1.8rem;
    border: 2px solid #c3c6ce;
    transition: 0.5s ease-out;
    overflow: visible;
  }

  .card-details {
    // color: black;
    height: 100%;
    gap: 0.5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    place-content: center;
  }
  .card-details-info {
    // border: 1px solid red;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
  }
  .card-pay {
    // font-family: "Roboto condensed", sans-serif;
    font-size: 25px;
    font-weight: 800;
    color: #662e26;
    margin-top: 1rem;
    // border: 1px solid red;
    font-family: "Oswald", sans-serif;
  }

  .card-details-info p {
    font-family: "Poppins", sans-serif;
    font-size: 17px;
    margin: 0;
    font-weight: 500;
    color: #662e26;
    border-bottom: 1px solid #662e26;
  }

  .text-title {
    font-family: "New Amsterdam", serif;
    letter-spacing: 2px;
    font-size: 30px;
    font-weight: 700;
    color: #662e26;
  }

  .card-button {
    transform: translate(-50%, 125%);
    width: 50%;
    border-radius: 10px;
    border: none;
    background: #662e26;
    color: #e0e0e0;
    font-size: 1rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    font-family: "Roboto condensed", sans-serif;
    text-transform: uppercase;
    position: absolute;
    left: 50%;
    bottom: 0;
    border: 1.2px solid #662e26;
    opacity: 0;
    // transition: 0.3s ease-out;
    transition: all 250ms;
      overflow: hidden;
  }

  /*Hover*/
  .card:hover {
    border-color: #662e26;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  }

  .card:hover .card-button {
    transform: translate(-50%, 50%);
    opacity: 1;
    cursor: pointer;
  }


  .card-button::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 0;
      border-radius: 5px;
      background-color: #e0e0e0;
      z-index: -1;
      -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
      box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
      transition: all 250ms
  }

  .card-button:hover {
      color: #662e26;    
  }

  .card-button:hover::before {
      width: 100%;
  }
`;

export default OrderCard2;
