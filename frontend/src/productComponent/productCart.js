import React, { useState, useEffect } from "react";
import "./productCart.css";

const ProductCart = () => {
  // Initial state
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subtotal, setSubtotal] = useState(0);

  const userData = JSON.parse(localStorage.getItem("USER"));
  const userID = userData.ID;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/products/detail/checkout?userID=${userID}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setCartItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    fetchSubtotal();
  }, [userID]);

  const fetchSubtotal = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/products/detail/checkout/total?userID=${userID}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      setSubtotal(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cartItems.length) return <div>Product not found</div>;

  const handleproceedtopay = () => {
    console.log("Payment Successful");
  };

  const handleRemoveItem = async (PR_ID) => {
    setLoading(true); // Set loading state when removing an item
    try {
      const response = await fetch(
        `http://localhost:5000/products/detail/checkout?userID=${userID}&PR_ID=${PR_ID}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      setCartItems(data);
      fetchSubtotal(); // Call fetchSubtotal after removing an item
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card-page">
      <h1>Shopping Cart</h1>
      <div className="product-show">
        <div className="show-all">
          {cartItems.filter(item => item !== null).map((cartItem) => (
            <div className="box" key={cartItem.PR_ID}>
              <img src={cartItem.SRC} alt={cartItem.NAME} />
              <div className="content">
                <h3>{cartItem.NAME}</h3>
                <h4>Price: ${cartItem.AMOUNT}</h4>
                <p className="unit">
                  Quantity:
                  <h3>{cartItem.QUANTITY}</h3>
                </p>
                <p className="btn-area">
                  <i aria-hidden="true" className="fa fa-trash"></i>
                  <span
                    className="btn2"
                    onClick={() => handleRemoveItem(cartItem.PR_ID)}
                  >
                    Remove
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="right-bar">
          <p>
            <span>Subtotal:</span> <span>${subtotal.TOTAL}</span>
          </p>
          <p>
            <span>Total:</span> <span>${subtotal.TOTAL}</span>
          </p>
          <a href="#" onClick={handleproceedtopay}>
            <i className="fa fa-shopping-cart" ></i>
            Proceed to pay
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
