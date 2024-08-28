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
  const [bool, setBool] = useState(false);
  const [getbool, setGetBool] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userData = JSON.parse(localStorage.getItem("USER"));
  const userID = userData.ID;

  useEffect(() => {
    setBool(true);
    setGetBool(true);
    const fetchOrderList = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/delivery?userID=${userID}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Orderlist data:", data);
        setOrderList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/delivery/track?userID=${userID}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("OrderDetails data:", data);
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
          console.log("DeliveryDetails data:", data);
          setDeliveryDetails(data);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchDeliveryDetails();
    }
  }, [OrderDetails]);

  const deleteCartItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/delivery/cart?userID=${userID}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete cart items");
      }
      setorderCartItems([]);
      console.log("Cart items deleted successfully");
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };
  if(getbool){
    deleteCartItems();
    setGetBool(false);
  }

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

  const deletegettable = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/delivery/get?userID=${userID}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete get table");
      }
      setorderCartItems([]);
      // console.log("Cart items deleted successfully");
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  }
  if(bool){
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
              <div className="InnerContainer">
                <div className="containerDetails">
                  <div className="col">
                    <p className="que">Estimated Delivery time:</p>
                    <p className="ans">{DeliveryDate}</p>
                  </div>
                  <div className="col">
                    <p className="que">Order ID:</p>
                    <p className="ans">HJBKBAD654</p>
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
            {OrderList.map((item) => (
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
