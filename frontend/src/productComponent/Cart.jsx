import React, { useState, useEffect } from 'react';
import Nabvar from '../Navbar';
import Button from "./Button";
import './Cart.css';
import { toast, ToastContainer } from 'react-toastify';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subtotal, setSubtotal] = useState(0);

  const userData = JSON.parse(localStorage.getItem("USER"));
  const userID = userData.ID;

 
  useEffect(() => {

    // const ADDRESS = {
    //   CITY: document.getElementById("City").value,
    //   STREET: document.getElementById("Street").value,
    //   HOUSE_NO: document.getElementById("House").value
    // };

    // const DeliveryData = async () => {
    //    try{
    //       const response = await fetch(`http://localhost:5000/products/detail/checkout?delivery=${ADDRESS.CITY}`); {
    //    }
    //     catch(err){
    //       console.log(err);
    //     }
    // };

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

  const handleQuantityChange = async (id, quantity) => {

    if (quantity < 1 || isNaN(quantity)) {
      console.log('Invalid credentials');
      toast.error('Item count can not be null', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/products/detail/checkout/updateQuantity`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID, id, quantity }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedCartItems = await response.json();
      setCartItems(updatedCartItems);
      fetchSubtotal(); // Update the subtotal after quantity change
    } catch (err) {
      setError(err.message);
    }
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
    <div className='main-app'>
      <ToastContainer />
      <div className="cart-container">
        <Nabvar />
        <div className="cart-header">
          <h2>Shopping Cart</h2>
        </div>
        <div className="cart">
          <div className="cart-items-summary">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.PR_ID} className="cart-item">
                  <img src={item.SRC} alt={item.name} />
                  <div className="item-details">
                    <p>{item.NAME}</p>
                    <p>{item.NAME}</p>
                    <p>€ {item.AMOUNT / item.QUANTITY}</p>
                    <div className="quantity">
                      <button
                        onClick={() => handleQuantityChange(item.PR_ID, item.QUANTITY - 1)}>
                        -
                      </button>
                      <input type="number"
                        required defaultValue={item.QUANTITY} min={1}
                        value={item.QUANTITY} onChange={(e) => handleQuantityChange(item.PR_ID, parseInt(e.target.value))} />
                      <button
                        onClick={() => handleQuantityChange(item.PR_ID, item.QUANTITY + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove" onClick={() => handleRemoveItem(item.PR_ID)}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="summary">
            <h3>Summary</h3>
            <div className="shipping-things">
              <label>City</label>
              <input type="text" id="City" placeholder="Enter City" className="shipping" />
              <label>Street</label>
              <input type="text" id="Street" placeholder="Enter Street" className="shipping" />
              <label>House No</label>
              <input type="text" id="House" placeholder="Enter House No" className="shipping" />
              <label>Assigned Delivery Man</label>
              <input type="text" className='shipping' placeholder='Arif Abdullah' disabled />
              <label htmlFor="shipping">Delivery Type</label>
              <select id='shipping' className='shipping'>
                <option value="5" className='shipping'>Standard-Delivery - €5.00</option>
                <option value="5" className='shipping'>Super Fast Delivery - €10.00</option>
              </select>
            </div>
            <div className='total-price'>
              <div className='sub-total'>
                <p>SUBTOTAL</p>
                <p>TOTAL PRICE INCLUDING 5% VAT</p>
              </div>
              <div className='final-total'>
                <p>: {subtotal.TOTAL}$</p>
                <p>: {subtotal.TOTAL_AMOUNT}$</p>
              </div>
            </div>
            <div className="checkout">
              <Button />
            </div>
            {/* <button className="checkout">CHECKOUT</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
