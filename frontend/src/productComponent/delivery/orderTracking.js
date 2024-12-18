import React, { useState, useEffect } from "react";
import "./OrderTracking.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../../Navbar";
import StepperComponent from "./StepperComponent.js";
import delivery from "../../img/deliveryman.svg";
import { useLocation } from "react-router-dom";
import Invoice from "./Invoice";
const URL = process.env.REACT_APP_API_URL;
const OrderConfirmation = () => {
  const [OrderList, setOrderList] = useState([]);
  const [OrderDetails, setOrderDetails] = useState([]);
  const [ordercartItems, setorderCartItems] = useState([]);
  const [DeliveryDetailsNew, setDeliveryDetailsNew] = useState([]);
  const [bool, setBool] = useState(false);
  const [getbool, setGetBool] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("USER"));
  const userID = userData.ID;
  const params = new URLSearchParams(location.search);
  const orderID = params.get("ORDER_ID");
  const transformToUppercase = (data) => {
    return Object.fromEntries(
       Object.entries(data).map(([key, value]) => [key.toUpperCase(), value])
    );
  };

  useEffect(() => {
    setBool(true);
    setGetBool(true);
    const fetchOrderList = async () => {
      try {
        const response = await fetch(
          `${URL}/delivery/orderlist?orderID=${orderID}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log("Order List:", data);
        const finalData = data.map(transformToUppercase);
        // console.log("Fetched data:", finalData);
        setOrderList(finalData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchDeliveryDetails = async () => {
      try {
        const response = await fetch(
          `${URL}/delivery/deliverydetails?orderID=${orderID}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDeliveryDetailsNew(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrderList();
    fetchDeliveryDetails();
  }, [orderID]);

  const deliveryDate =
    DeliveryDetailsNew.length > 0
      ? DeliveryDetailsNew[0].delivery_date?.slice(0, 10)
      : "Not available";
  const shippingBy =
    DeliveryDetailsNew.length > 0
      ? DeliveryDetailsNew[0].name
      : "Not available";
  const address =
    DeliveryDetailsNew.length > 0
      ? `${DeliveryDetailsNew[0].city}, ${DeliveryDetailsNew[0].street}, ${DeliveryDetailsNew[0].city}`
      : "Not available";
  const contact =
    DeliveryDetailsNew.length > 0
      ? DeliveryDetailsNew[0].contanct_no
      : "Not available";

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
      // console.log("Cart items deleted successfully");
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };
  if (getbool) {
    deleteCartItems();
    setGetBool(false);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!OrderList.length) return <div>No products found</div>;

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
  };
  if (bool) {
    deletegettable();
    setBool(false);
  }

  return (
    <div className="orderContainer">
      <Navbar />
      <article className="ordercard-article">
        <div className="order-card-body">
          <div className="ordercard">
            <header className="order-card-header">
              <u>My order tracking</u>
            </header>
            <Invoice
                orderID={orderID}
                deliveryDate={deliveryDate}
                shippingBy={shippingBy}
                contact={contact}
                orderList={OrderList}
              />
            <div className="InnerContainer">
              <div className="containerDetails">
                <div className="col">
                  <p className="que">Estimated Delivery time:</p>
                  <p className="ans">{deliveryDate}</p>
                </div>
                <div className="col">
                  <p className="que">Order ID:</p>
                  <p className="ans">{orderID}</p>
                </div>
                <div className="col">
                  <p className="que">Shipping BY:</p>
                  <p className="ans">
                    {shippingBy} | +88{contact}
                  </p>
                </div>
                <div className="col">
                  <p className="que">Status:</p>
                  <p className="ans">Picked by the courier</p>
                </div>
                <div className="col">
                  <p className="que">Address:</p>
                  <p className="ans">{address}</p>
                </div>
              </div>
              <div>
                <StepperComponent
                  date={deliveryDate}
                />
              </div>
              <img src={delivery} alt="delivery" className="imgtruck" />
            </div>
          </div>
          <hr />
          {/* Add your Slider and other components here */}
        </div>
      </article>
      <div className="lower-container">
        <div className="ordercartlower">
          {OrderList.map((item) => (
            <div key={item.PR_ID} className="ordercart-item">
              <img src={item.SRC} alt={item.NAME} className="ordercartimg" />
              <div className="orderitem-details">
                <p>{item.NAME}</p>
                <p>BDT {item.PRICE}</p>
                <div className="orderquantity">Quantity:{item.QUANTITY}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
