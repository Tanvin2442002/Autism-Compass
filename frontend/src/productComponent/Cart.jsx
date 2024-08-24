import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Button from "./Button";
import './Cart.css';
import { toast, ToastContainer } from 'react-toastify';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [assignedDeliveryMan, setAssignedDeliveryMan] = useState('');
  const [deliverymanID,setdeliverymanID]=useState('')
  const [address, setAddress] = useState({
    city: '',
    street: '',
    houseNo: ''
  });
  const navigate = useNavigate();

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
        if(response.status===404)
          {
            navigate('/products');
            
          }
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

  const handleQuantityChange = async (id, quantity) => {
    if (quantity < 1 || isNaN(quantity)) {
      console.log('Invalid credentials');
      toast.error('Item count cannot be null', {
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

  const handleRemoveItem = async (PR_ID,event) => {
    if (event) {
      event.preventDefault();
    }
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

  const handleCityChange = async (e) => {
    const city = e.target.value;
    setAddress({ ...address, city });

    try {
      const response = await fetch(`http://localhost:5000/products/detail/checkout/deliveryman?city=${city}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setAssignedDeliveryMan(data[0].NAME);
      setdeliverymanID(data[0].D_ID);
    } catch (err) {
      console.error("Failed to fetch the assigned delivery man:", err);
      setAssignedDeliveryMan('');
    }
  };

  const setDeliveryAddress = async () => {
    const param = {
        CITY: address.city,
        STREET: address.street,
        HOUSE_NO: address.houseNo,
        P_ID: userID,
        D_ID: deliverymanID,
        DELIVERY_DATE: new Date().toISOString().split('T')[0]
    }
    try {
      const response = await fetch("http://localhost:5000/products/detail/checkout/setAddress", {
        method: "POST",
        body: JSON.stringify(param),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "Delivery address updated successfully!") {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(data.message, {
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
    } catch (error) {
      console.error('Error executing fetch:', error);
      toast.error('Failed to update delivery address', {
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
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cartItems.length) return <div>Product not found</div>;

  return (
    <div className='main-app'>
      <ToastContainer />
      <div className="cart-container">
        <Navbar />
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
                    className="remove" onClick={(e) => handleRemoveItem(item.PR_ID,e)}>
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
              <input
                type="text"
                id="City"
                placeholder="Enter City"
                className="shipping"
                value={address.city}
                onChange={handleCityChange}
                required
              />
              <label>Street</label>
              <input
                type="text"
                id="Street"
                placeholder="Enter Street"
                className="shipping"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                required
              />
              <label>House No</label>
              <input
                type="text"
                id="House"
                placeholder="Enter House No"
                className="shipping"
                value={address.houseNo}
                onChange={(e) => setAddress({ ...address, houseNo: e.target.value })}
                required
              />
              <label>Assigned Delivery Man</label>
              <input
                type="text"
                className='shipping'
                value={assignedDeliveryMan}
                disabled
              />
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
            <div className="checkout" onClick={setDeliveryAddress}>
              <Button />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
