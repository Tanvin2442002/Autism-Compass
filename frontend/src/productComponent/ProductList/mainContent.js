

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./mainContent.css";
import SingleProductCard from "./SingleProductCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../LoadingAnimation";


const MainContent = ({ products }) => {
   const [productCards, setProduct] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      // console.log("Products:", products);
      if (products.length > 0) {
         setProduct(products);
         setLoading(false);
         setError(false);
         // console.log("Product cards:", productCards);
      } else {
         setError(true);
      }

   }, [products]);

   const listItems = productCards.map((item) =>
      <div className="" key={item.PR_ID}>
         <SingleProductCard itemDetails={item} />
      </div>
   );

   if (loading) return <div className="loader-maincontent"><Loader/></div>;
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
