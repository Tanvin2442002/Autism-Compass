import React, { useState } from "react";
import styled from "styled-components";
import AddCart from "../AddCart";
import { toast, ToastContainer } from "react-toastify";

const SingleProductCard = ({ itemDetails }) => {
  const [PopUp, setPopUp] = useState(false);

  const localData = JSON.parse(localStorage.getItem("USER"));

  const handleAddCart = () => {
    console.log("Add to cart clicked");
    setPopUp(true);
  };

  const handleCancel = () => {
    setPopUp(false);
  };

  const handlePopUp = async () => {
    console.log("Local data:", localData);
    console.log("Item added to cart", itemDetails);
    const data = {
      PR_ID: itemDetails.PR_ID,
      P_ID: localData.ID,
      AMOUNT: itemDetails.PRICE,
      QUANTITY: 1,
      DOB: new Date().toISOString().slice(0, 10),
    };

    try {
      const response = await fetch(`http://localhost:5000/products/add/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const status = response.status;
      if (status === 200) {
        toast.success("Product added to cart", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Product is already in the cart", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      console.log("Error in adding to cart", err);
    }

    setPopUp(false);
  };

  return (
    <StyledWrapper>
      <ToastContainer/>
      <div className="card">
        <div className="card-img-body">
          <img
            src={itemDetails.SRC}
            alt={itemDetails.NAME}
            className="card-img"
          />
          <div className="card-info">
            <p className="text-title">{itemDetails.NAME} </p>
            <p className="text-body">{itemDetails.DESCRIPTION}</p>
          </div>
        </div>
        <div className="card-footer">
          <div className="card-button" onClick={handleAddCart}>
            <AddCart price={itemDetails.PRICE} />
          </div>
        </div>
        {PopUp && (
          <div className="confirmation-dialog">
            <div className="confirmation-dialog-content">
              <p>Do you want to add this product to cart?</p>
              <button className="confirm-btn" onClick={handlePopUp}>
                Yes
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 270px;
    height: 380px;
    padding: 0.8em;
    background: #bdd1e1;
    position: relative;
    overflow: visible;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  .card-img {
    background-color: #ffcaa6;
    height: 50%;
    width: 100%;
    border-radius: 0.5rem;
    transition: 0.3s ease;
  }

  .card-img-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    max-height: 90%;
  }

  .card-info {
    height: 40%;
    padding-top: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .card-footer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid #3f0000;
  }

  .text-title {
    text-align: center;
    font-size: 1.2rem;
    color: rgb(63, 0, 0);
    margin-bottom: 0px;
    font-weight: 650;
    word-spacing: 1px;
    justify-content: center;
    font-family: "Poppins", sans-serif;
  }

  .text-body {
    font-size: 0.9em;
    text-align: center;
    padding: 10px;
    word-spacing: 1px;
    justify-content: center;
    font-family: "Poppins", sans-serif;
  }

  .card-button {
    display: flex;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    align-items: center;
    justify-content: center;
  }

  .card:hover {
    background: #a1b2c1;
  }

  .card-img:hover {
    transform: translateY(-20%);
    box-shadow: rgba(226, 196, 63, 0.25) 0px 13px 47px -5px,
      rgba(180, 71, 71, 0.3) 0px 8px 16px -8px;
  }

  .confirmation-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }

  .confirmation-dialog-content {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    text-align: center;
  }

  .confirm-btn,
  .cancel-btn {
    padding: 10px 20px;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    font-size: 1rem;
  }

  .confirm-btn {
    background-color: #e74c3c;
    color: #fff;
  }

  .cancel-btn {
    background-color: #ccc;
    color: #333;
  }
`;

export default SingleProductCard;
