import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const OrderCard = ({ product }) => {
  const navigate = useNavigate();
  const deliveryDate = product.DELIVERY_DATE.slice(0, 10);
  const handleDeliveryDetails = () => {
    console.log("Delivery Details:", product);
    navigate('/products/delivery');
  };
  return (
    <StyledWrapper>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p className="title">Order ID: {product.B_ID}</p>
            <p className="date-card">Delivery Date: {deliveryDate}</p>
          </div>
          <div className="flip-card-back">
            <p className="title">Total Cost: {product.AMOUNT} BDT</p>
            <p>Delivery Man: {product.NAME}</p>
            <p>Contact No: {product.CONTANCT_NO}</p>
            <p>Total Quantity: {product.TOTAL_QUANTITY} </p>
            <button className="view-more-button" onClick={handleDeliveryDetails}>View More</button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .flip-card {
    background-color: transparent;
    width: 220px;
    height: 300px;
    perspective: 1000px;
    font-family: sans-serif;
  }
  
  .date-card {
    font-size: 1 rem;
    font-weight: 400;
    text-align: center;
    margin: 0;
  }

  .title {
    font-size: 1em;
    font-weight: 900;
    text-align: center;
    margin: 0;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front, .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid coral;
    border-radius: 1rem;
  }

  .flip-card-front {
    background: linear-gradient(120deg, bisque 60%, rgb(255, 231, 222) 88%,
       rgb(255, 211, 195) 40%, rgba(255, 127, 80, 0.603) 48%);
    color: coral;
  }

  .flip-card-back {
    background: linear-gradient(120deg, rgb(255, 174, 145) 30%, coral 88%,
       bisque 40%, rgb(255, 185, 160) 78%);
    color: white;
    transform: rotateY(180deg);
  }
`;

export default OrderCard;
