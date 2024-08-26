import React, { useState, useEffect } from "react";
import "./OrderTracking.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../../Navbar";
import StepperComponent from "./StepperComponent.js";
import delivery from "../../img/deliveryman.svg";

const OrderConfirmation = () => {
  const [OrderList, setOrderList] = useState([]);
  const [OrderDetails, setOrderDetails] = useState([]);
  const [ordercartItems, setorderCartItems] = useState([]);
  const [DeliveryDetails, setDeliveryDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userData = JSON.parse(localStorage.getItem("USER"));
  const userID = userData.ID;

  function Str_Random(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    // Loop to generate characters for the specified length
    for (let i = 0; i < length; i++) {
      const randomInd = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomInd);
    }
    return result;
  }

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/delivery?userID=${userID}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOrderList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
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
        setorderCartItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();

    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/delivery/track?userID=${userID}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOrderDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderList();
    fetchOrderDetails();
  }, [userID]);

  useEffect(() => {
    if (OrderDetails.length > 0) {
      const DeliveryID = OrderDetails[0].D_ID;
      const fetchDeliveryDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/delivery/track/deliveryman?deliveryID=${DeliveryID}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setDeliveryDetails(data);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchDeliveryDetails();
    }
  }, [OrderDetails]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!OrderList.length) return <div>No products found</div>;

  let DeliveryDate, DeliveryMan, city, street, house_no;
  if (OrderDetails.length > 0) {
    const order = OrderDetails[0];
    DeliveryDate = order.DELIVERY_DATE;
    city = order.CITY;
    street = order.STREET;
    house_no = order.HOUSE_NO;
  }

  if (DeliveryDetails.length > 0) {
    DeliveryMan = DeliveryDetails[0].NAME;
  }

  const obj = {
    CITY: city,
    STREET: street,
    HOUSE_NO: house_no,
  };

  const listItems = OrderList.map((item) => (
    <div className="ordercardslick" key={item.ID}>
      <div className="ordercardslick-img">
        <img src={item.SRC} alt={item.NAME} />
      </div>
      <div className="ordercardslick-content">
        <h3>{item.NAME}</h3>
        <p>{item.PRICE}</p>
      </div>
    </div>
  ));

  return (
    <div className="orderContainer">
      <Navbar />
      <article className="ordercard-article">
        <div className="order-card-body">
          <div className="ordercard">
            <header className="order-card-header">
              <u>My order tracking</u>
            </header>
            <div className="InnerContainer">
              <div className="containerDetails">
                <div className="col">
                  <p className="que">Estimated Delivery time:</p>
                  <p className="ans">{DeliveryDate}</p>
                </div>
                <div className="col">
                  <p className="que">Order ID:</p>
                  <p className="ans">{Str_Random(13)}</p>
                </div>
                <div className="col">
                  <p className="que">Shipping BY:</p>
                  <p className="ans">{DeliveryMan}</p>
                </div>
                <div className="col">
                  <p className="que">Status:</p>
                  <p className="ans">Picked by the courier</p>
                </div>
                <div className="col">
                  <p className="que">Address:</p>
                  <p className="ans">{`${obj.HOUSE_NO}, ${obj.STREET}, ${obj.CITY}`}</p>
                </div>
              </div>
              <div>
                <StepperComponent />
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
          {ordercartItems.map((item) => (
            <div key={item.PR_ID} className="ordercart-item">
              <img src={item.SRC} alt={item.name} className="ordercartimg" />
              <div className="orderitem-details">
                <p>{item.NAME}</p>
                <p>BDT {item.AMOUNT / item.QUANTITY}</p>
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
