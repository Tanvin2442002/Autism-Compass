import React from "react";
import { useState, useEffect } from "react";
import "./OrderTracking.css"; // Make sure this path is correct
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCheck, FaUser, FaTruckMoving, FaBox } from "react-icons/fa";
import delivery from "../../img/deliveryman.svg";
import Navbar from "../../Navbar";
import StepperComponent from "./StepperComponent.js";

// import { TbGiftFilled } from "react-icons/tb";

const OrderConfirmation = () => {
  const [OrderList, setOrderList] = useState([]);
  const [OrderDetails, setOrderDetails] = useState([]);
  const [DeliveryDetails, setDeliveryDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function Str_Random(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    // Loop to generate characters for the specified length
    for (let i = 0; i < length; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomInd);
    }
    return result;
}
console.log(Str_Random(10));

  const userData = JSON.parse(localStorage.getItem("USER"));
  const userID = userData.ID;

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
        console.log("Fetched data:", data);
        setOrderList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderList();

    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/delivery/track?userID=${userID}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setOrderDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();

    let DeliveryID;
    OrderDetails.map((item) => (
      DeliveryID = item.D_ID
    ));
    const fetchDeliveryDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/delivery/track/deliveryman?deliveryID=${DeliveryID}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setDeliveryDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveryDetails();
  }, []);

  const settings = {
    dots: true,
    autoplay: OrderList.length > 4 ? true : false,
    autoplaySpeed: 1500,
    infinite: OrderList.length > 4 ? true : false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  let DeliveryDate;
  let DeliveryMan;
  let city,street,house_no;
  OrderDetails.map((item) => (
    DeliveryDate = item.DELIVERY_DATE,
    city = item.CITY,
    street = item.STREET,
    house_no = item.HOUSE_NO
  ));

  DeliveryDetails.map((item) => (
    DeliveryMan = item.NAME
  ));


  const obj = {
    CITY : city,
    STREET : street,
    HOUSE_NO : house_no
  }


  const listItems = OrderList.map((item) => (
    <div className="ordercardslick">
      <div className="ordercardslick-img">
        <img src={item.SRC} alt={item.NAME} />
      </div>
      <div className="ordercardslick-content">
        <h3>{item.NAME}</h3>
        <p>{item.PRICE}</p>
      </div>
    </div>
  ));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!OrderList.length) return <div>No products found</div>;
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
                  <p className="ans">{DeliveryMan} </p>
                </div>
                <div className="col">
                  <p className="que">Status:</p>
                  <p className="ans">Picked by the courier</p>
                </div>
                <div className="col">
                  <p className="que">Address:</p>
                  <p className="ans">{obj.HOUSE_NO},{obj.STREET},{obj.CITY}</p>
                </div>
              </div>
              <div>
                <StepperComponent/>
              </div>
              <img src={delivery} alt="delivery" className="imgtruck" />
            </div>
            {/* <div className="track">
              <div className="step active">
                <span className="icon">
                  <FaCheck />
                </span>
                <span className="text">Order confirmed</span>
              </div>
              <div className="step active">
                <span className="icon">
                  <FaUser />
                </span>
                <span className="text">Picked by courier</span>
              </div>
              <div className="step">
                <span className="icon">
                  <FaTruckMoving />
                </span>
                <span className="text">On the way</span>
              </div>
              <div className="step">
                <span className="icon">
                  <FaBox />
                </span>
                <span className="text">Ready for pickup</span>
              </div>
            </div> */}
          </div>
          <hr />
          {/* {/* <div className="orderslider-container">
            <Slider {...settings}>{listItems}</Slider>
          </div>
          <hr />
          <a href="#" className="btn btn-warning" data-abc="true">
            <i className="fa fa-chevron-left"></i> Back to orders
          </a> */}
        </div> 
      </article>
    </div>
  );
};

export default OrderConfirmation;
