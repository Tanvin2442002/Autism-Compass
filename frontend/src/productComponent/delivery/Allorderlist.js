import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import OrderImage from "../../img/Orderlist.svg";
import Navbar from "../../Navbar";
import "./Allorderlist.css";

const Allorderlist = () => {
  const [AllOrderList, setAllOrderList] = useState([]);
  const userData = JSON.parse(localStorage.getItem("USER"));
  const userID = userData.ID;
  console.log("User ID:", userID);

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
        console.log("Fetched data:", data);
        setAllOrderList(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrderList();
  }, [userID]);

  return (
    <div>
      <Navbar />
      <header className="orderlist-header">My Order List</header>
      <div className="orderList-All-container">
          {/* <header>My Order List</header> */}
        <div className="OrderList-All">
          {/* <header>My Order List</header> */}
          {AllOrderList.map((order, index) => (
            <OrderCard key={index} product={order} />
          ))}
        </div>

        <div className="delivery-img-div">
          <img src={OrderImage} alt="OrderList" className="orderlist-img" />
        </div>
      </div>
    </div>
  );
};

export default Allorderlist;
