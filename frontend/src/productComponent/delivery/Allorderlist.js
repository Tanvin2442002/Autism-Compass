import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import OrderCard2 from "./OrderCard2";
import OrderImage from "../../img/Orderlist.svg";
import Navbar from "../../Navbar";
import "./Allorderlist.css";

const Allorderlist = () => {
  const [AllOrderList, setAllOrderList] = useState([]);
  const userData = JSON.parse(localStorage.getItem("USER"));
  const userID = userData.ID;
  // console.log("User ID:", userID);
  const transformToUppercase = (data) => {
    return Object.fromEntries(
       Object.entries(data).map(([key, value]) => [key.toUpperCase(), value])
    );
 };
  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/delivery/get/orders?userID=${userID}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const finalData = data.map(transformToUppercase);
        // console.log("Fetched data:", finalData);
        setAllOrderList(finalData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrderList();
  }, [userID]);

  
  return (
    <div>
      <Navbar />
      <div className="orderList-All-container">
        <div className='header-list'>
          <header className="orderlist-header">My Order List</header>
          <div className="OrderList-All">
            {AllOrderList.map((order, index) => (
              <OrderCard2 key={index} product={order} />
            ))}
          </div>
        </div>
        <img src={OrderImage} alt="OrderList" className="orderlist-img" />
      </div>
    </div>
  );
};

export default Allorderlist;
