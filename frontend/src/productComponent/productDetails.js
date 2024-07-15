import React, { useState, useEffect } from "react";
import "./ProductDetails.css"; // Import the CSS file
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import MainContent from "./ProductList/mainContent";

const ProductDetails = () => {
   const [product, setProduct] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [quantity, setQuantity] = useState(1);

   const location = useLocation();
   const navigate = useNavigate();
   const params = new URLSearchParams(location.search);
   const productType = params.get("ID");

   const userData = JSON.parse(localStorage.getItem("USER"));

   useEffect(() => {
      const fetchProduct = async () => {
         try {
            const response = await fetch(
               `http://localhost:5000/products/detail?ID=${productType}`
            );
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Fetched data:", data);
            setProduct(data);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      };

      
      fetchProduct();
   }, [productType]);

   if (loading) return <div>Loading...</div>;
   if (error) return <div>Error: {error}</div>;
   if (!product) return <div>Product not found</div>;

   const totalPrice = product.PRICE * quantity;

   const addCart = async (PR_ID, quantity) => {
      const purchaseData = {
         P_ID: userData.ID,
         PR_ID: PR_ID,
         QUANTITY: quantity,
         AMOUNT: totalPrice,
         DOB: new Date().toISOString().slice(0, 10),
      };
      try {
         const response = await fetch("http://localhost:5000/products/detail", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(purchaseData),
         });
         if (!response.ok) {
            throw new Error("Network response was not ok");
         }
         const data = await response.json();
         console.log("Cart data:", data);

         if (data.message === "Product added to cart successfully") {
            toast.success("Product added to cart successfully", {
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
         setError(err.message);
      }
   };

   const handleCheckout = () => {
      navigate("/products/detail/checkout");
   };

   const handleContinueShopping = () => {
      navigate("/products");
   };

   return (
      <div className="product-details-before-checkout">
         <Navbar />
         <div className="product-details">
            <ToastContainer />
            <div className="product-image">
               <img
                  src={product.SRC}
                  alt={product.NAME}
               />
            </div>
            <div className="product-info">
               <h1>{product.NAME}</h1>
               <div className="product-description">
                  <p>{product.DESCRIPTION}</p>
               </div>
               <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                     type="number"
                     id="quantity"
                     name="quantity"
                     min="1"
                     value={quantity}
                     onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <div className="product-meta">
                     <span>Price: ${product.PRICE}</span>
                     <span>Total: ${totalPrice}</span>
                  </div>
               </div>
               <div className="button-group">
                  <button className="cart-button" onClick={() => addCart(product.PR_ID, quantity)}>
                     Add to cart
                  </button>
                  <button className="checkout-button" onClick={handleCheckout}>
                     Checkout
                  </button>
                  <button
                     className="continue-shopping-button"
                     onClick={handleContinueShopping}
                  >
                     Continue Shopping
                  </button>
               </div>
            </div>
         </div>
         <MainContent />
      </div>
   );
};

export default ProductDetails;
