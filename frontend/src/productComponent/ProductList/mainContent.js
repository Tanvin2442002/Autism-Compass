

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./mainContent.css";
import SingleProductCard from "./SingleProductCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const MainContent = () => {
   const [productCards, setProduct] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const userID = JSON.parse(localStorage.getItem("USER"));
   const navigate = useNavigate();

   // useEffect(() => {
   //    const fetchProduct = async () => {
   //       try {
   //          const response = await fetch(`http://localhost:5000/products`);
   //          if (!response.ok) {
   //             throw new Error("Network response was not ok");
   //          }
   //          const data = await response.json();
   //          console.log('Fetched data:', data);
   //          setProduct(data);
   //       } catch (err) {
   //          setError(err.message);
   //       } finally {
   //          setLoading(false);
   //       }
   //    };
   //    fetchProduct();
   // }, [])

   const listItems = productCards.map((item) =>
      <div className="" key={item.PR_ID}>
         <SingleProductCard itemDetails={item}/>
      </div>
   );

   if (loading) return <div>Loading...</div>;
   if (error) return <div>Error: {error}</div>;
   if (!productCards.length) return <div>No products found</div>;

   return (
      <div className="main_content">
         <ToastContainer />
         <h2>More Products</h2>
         {listItems}
      </div >
   );
}
export default MainContent;
