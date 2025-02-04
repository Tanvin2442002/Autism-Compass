import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Button from "./Button";
import CarLoader from "./CarLoader.js";
import "./Cart.css";import { toast, ToastContainer } from "react-toastify";

const URL = process.env.REACT_APP_API_URL;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ordercartItems, setorderCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [error, setError] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [DeliveryCost,setDeliveryCost] = useState(5);
  const [assignedDeliveryMan, setAssignedDeliveryMan] = useState("");
  const [deliverymanID, setdeliverymanID] = useState("");
  const [address, setAddress] = useState({
    city: "",
    street: "",
    houseNo: "",
  });
  const [message, setMessage] = useState("---");

  const navigate = useNavigate();
  function Str_Random(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < length; i++) {
      const randomInd = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomInd);
    }
    return result;
  }

  const userData = JSON.parse(localStorage.getItem("USER"));
  const userID = userData.ID;

  const transformToUppercase = (data) => {
    return Object.fromEntries(
       Object.entries(data).map(([key, value]) => [key.toUpperCase(), value])
    );
 };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${URL}/products/detail/checkout?userID=${userID}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const finalData = data.map(transformToUppercase);
        
        setCartItems(finalData);
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
        `${URL}/products/detail/checkout/total?userID=${userID}`
      );
      if (response.status === 404) {
        setErrorMessage(
          "Your cart is empty. Redirecting to the products page..."
        );
        
        navigate("/products");

      }
      const data = await response.json();
      // const finalData = data.map(transformToUppercase);
      
      setSubtotal(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    if (quantity < 1 || isNaN(quantity)) {
      
      toast.error("Item count cannot be null", {
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
        `${URL}/products/detail/checkout/updateQuantity`,
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
      const finalupdatedCartItems = updatedCartItems.map(transformToUppercase);
      setCartItems(finalupdatedCartItems);
      fetchSubtotal(); // Update the subtotal after quantity change
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveItem = async (PR_ID, event) => {
    if (event) {
      event.preventDefault();
    }
    setLoading(true); // Set loading state when removing an item
    try {
      const response = await fetch(
        `${URL}/products/detail/checkout?userID=${userID}&PR_ID=${PR_ID}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      
      const finalData = data.map(transformToUppercase);
      setCartItems(finalData);
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
      const response = await fetch(
        `${URL}/products/detail/checkout/deliveryman?city=${city}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const finalData = data.map(transformToUppercase);
      
      setAssignedDeliveryMan(finalData[0].NAME);
      setdeliverymanID(finalData[0].D_ID);
    } catch (err) {
      console.error("Failed to fetch the assigned delivery man:", err);
      setAssignedDeliveryMan("");
    }
  };

  const deleteCartItems = async () => {
    try {
      const response = await fetch(
        `${URL}/delivery/cart?userID=${userID}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete cart items");
      }
      setorderCartItems([]);
      
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  const deletegettable = async () => {
    try {
      const response = await fetch(
        `${URL}/delivery/get?userID=${userID}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete get table");
      }
      setorderCartItems([]);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  }

  const setDeliveryAddress = async () => {
    if (!address.city || !address.street || !address.houseNo) {
      toast.error("Please fill in all the fields", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const date = new Date();
    date.setDate(date.getDate() + 4); // Add 3 days to the current date
    const param = {
      CITY: address.city,
      STREET: address.street,
      HOUSE_NO: address.houseNo,
      P_ID: userID,
      D_ID: deliverymanID,
      DELIVERY_DATE: date.toISOString().split("T")[0],
    };
    try {
      const response = await fetch(
        "${URL}/products/detail/checkout/setAddress",
        {
          method: "POST",
          body: JSON.stringify(param),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // const finalData = data.map(transformToUppercase);
    } catch (error) {
      console.error("Error executing fetch:", error);
      toast.error("Failed to update delivery address", {
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
    const orderID = Str_Random(13);

    try {
      const params = {
        ORDER_ID: orderID,
        AMOUNT: subtotal[0].total_amount,
        DELIVERY_DATE: date.toISOString().split("T")[0],
      };
      const response = await fetch(
        "${URL}/products/detail/checkout/setBill",
        {
          method: "POST",
          body: JSON.stringify(params),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
    } catch (error) {
      console.error("Error executing fetch:", error);
    }
    try {
      const params = {
        ORDER_ID: orderID,
        D_ID: deliverymanID,
      };
      const response = await fetch(
        "${URL}/products/detail/checkout/setAssignedTo",
        {
          method: "POST",
          body: JSON.stringify(params),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
    } catch (error) {
      console.error("Error executing fetch:", error);
    }
    let flag = 0;
    cartItems.forEach(async (item) => {
      const params = {
        ORDER_ID: orderID,
        PR_ID: item.PR_ID,
        QUANTITY: item.QUANTITY,
        P_ID: userID,
        // AMOUNT: item.AMOUNT,
        CITY: address.city,
        STREET: address.street,
        HOUSE_NO: address.houseNo,
        DELIVERY_DATE: date.toISOString().split("T")[0],
      };

      try {
        const response = await fetch(
          "${URL}/products/detail/checkout/setOrder",
          {
            method: "POST",
            body: JSON.stringify(params), // Note: Changed 'param' to 'params'
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        // const finalData = data.map(transformToUppercase);
        
        
        setMessage(data.message);
        
        
        address.city = "";
        address.street = "";
        address.houseNo = "";
        if (data.message === "Order placed successfully!" && flag == 0) {
          flag = 1;
          toast.success("Order placed successfully", {
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
        setLoading(true);
        setTimeout(() => {
          navigate("/products/orders");
          deleteCartItems();
          deletegettable();

        }, 4500);
      } catch (error) {
        console.error("Error executing fetch:", error);
        toast.error("Failed to place order", {
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
    });
    
  };
  // 
  // 
  if (error) return <div>Error: {error}</div>;
  if (!cartItems.length) return <div>page not found</div>;
  const isFormComplete =
    address.city && address.street && address.houseNo && assignedDeliveryMan;
  return (
    <div className="main-app">
      <ToastContainer />
      <div className="cart-container">
        <Navbar />
        <div className="cart-header">
          <h2>Shopping Cart</h2>
        </div>
        <div className="cart">
          <div className="cart-items-summary">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.PR_ID} className="cart-item">
                  <img src={item.SRC} alt={item.name} />
                  <div className="item-details">
                    <p>{item.NAME}</p>
                    <p>€ {item.AMOUNT / item.QUANTITY}</p>
                    <div className="quantity">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.PR_ID, item.QUANTITY - 1)
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        required
                        defaultValue={item.QUANTITY}
                        min={1}
                        value={item.QUANTITY}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.PR_ID,
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(item.PR_ID, item.QUANTITY + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove"
                    onClick={(e) => handleRemoveItem(item.PR_ID, e)}
                  >
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
                required
                id="City"
                placeholder="Enter City"
                className="shipping"
                value={address.city ? address.city : ""}
                onChange={handleCityChange}
              />
              <label>Street</label>
              <input
                type="text"
                required
                id="Street"
                placeholder="Enter Street"
                className="shipping"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />
              <label>House No</label>
              <input
                type="text"
                // autoComplete='off'
                required
                id="House"
                placeholder="Enter House No"
                className="shipping"
                value={address.houseNo}
                onChange={(e) =>
                  setAddress({ ...address, houseNo: e.target.value })
                }
              />
              <label>Assigned Delivery Man</label>
              <input
                type="text"
                className="shipping"
                value={assignedDeliveryMan}
                disabled
              />
              <label htmlFor="shipping">Delivery Type</label>
              <select id="shipping" className="shipping"  onChange={(e) => setDeliveryCost(parseInt(e.target.value))}>
                <option value="5" className="shipping">
                  Standard-Delivery - €5.00
                </option>
                <option value="10" className="shipping">
                  Super Fast Delivery - €10.00
                </option>
              </select>
            </div>
            <div className="total-price">
              <div className="sub-total">
                <p>SUBTOTAL</p>
                <p>TOTAL PRICE INCLUDING 5% VAT</p>
              </div>
              <div className="final-total">
                <p>: {((Number(subtotal[0]?.total) + DeliveryCost).toFixed(2))}$</p>
                <p>: {((Number(subtotal[0]?.total_amount)) + DeliveryCost).toFixed(2)}$</p> 
            </div>
            </div>
            <div
              className="checkout"
              onClick={isFormComplete ? setDeliveryAddress : null}
              style={{
                pointerEvents: isFormComplete ? "auto" : "none",
                opacity: isFormComplete ? 1 : 0.5,
              }}
            >
              {/* {loading && <Loader />} */}
              <Button />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
