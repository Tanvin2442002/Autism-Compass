import React, { useState } from "react";
import styled from "styled-components";
import AddCart from "../AddCart";

const SingleProductCard = ({ itemDetails }) => {

   const [PopUp, setPopUp] = useState(false);

   const localData = JSON.parse(localStorage.getItem("USER"));

   const handleAddCart = async () => {
      console.log("Local data:", localData);
      console.log("Item added to cart", itemDetails);
      const data = {
         PR_ID: itemDetails.PR_ID,
         P_ID: localData.ID,
         AMOUNT: itemDetails.PRICE,
         QUANTITY: 1,
         DOB: new Date().toISOString().slice(0, 10),
      };

      console.log("Data:", data);

      try {
         const response = fetch(`http://localhost:5000/products/add/cart`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         });
         console.log("Response:", (await response).status);
         const status = (await response).status;
         if (status == 200) {
            console.log("Product added to cart successfully");
            setPopUp(true);
         }
         else {
            console.log("Product not added to cart");
            setPopUp(false);
         }
      }
      catch (err) {
         console.log("Error in adding to cart", err);
      }

   };

   return (
      <StyledWrapper>
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
         </div>
      </StyledWrapper>
   );
};

const StyledWrapper = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=New+Amsterdam&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=New+Amsterdam&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=New+Amsterdam&family=Noto+Sans+Hanunoo&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

.card {
   width: 270px;
   height: 380px;
   padding: .8em;
   background: #BDD1E1;
   position: relative;
   overflow: visible;
   box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.card-img {
   background-color: #ffcaa6;
   height: 50%;
   width: 100%;
   border-radius: .5rem;
   transition: .3s ease;
}

.card-img-body{
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

svg {
   width: 20px;
   height: 20px;
}

.card-footer {
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   padding-top: 10px;
   border-top: 1px solid #3F0000;
}

.text-title {
   text-align: center;
   font-size: 1.2rem;
   color: rgb(63, 0, 0);
   margin-bottom: 0px;
   font-weight: 650;
   word-spacing: 1px;
   justify-content: center; 
   font-family: 'Poppins', sans-serif;
}

.text-body {
   font-size: .9em;
   text-align: center;
   padding: 10px;
   word-spacing: 1px;
   justify-content: center;
   font-family: 'Poppins', sans-serif;
}

.card-button {
   // border: 1px solid #252525;
   display: flex;
   // padding: .3em;
   cursor: pointer;
   // border-radius: 50px;
   transition: .3s ease-in-out;
   align-items: center;
   justify-content: center;
}

.card:hover{
   background:#a1b2c1;
}

.card-img:hover {
   transform: translateY(-20%);
   box-shadow: rgba(226, 196, 63, 0.25) 0px 13px 47px -5px, rgba(180, 71, 71, 0.3) 0px 8px 16px -8px;
}

.card-button:hover {
   // border: 1px solid #BDD1E1;
   // background-color: #BDD1E1;
}


`;

export default SingleProductCard;
