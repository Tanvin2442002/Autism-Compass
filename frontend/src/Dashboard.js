import React from 'react';
import './Dashboard.css'; // Ensure to create and use this CSS file
import logo1 from './110-1103827_old-map-compass-png-compass-rose-coloring-page.png'; // Replace with the actual path to your image
import logo2 from './201174779-afro-autist-boy-with-puzzle.jpg'; // Replace with the actual path to your image

function Dashboard() {
  return (
    <div className="dashboard">
      <header className="navbar">
        <img src={logo1} alt="Logo 1" />
        <h1>AUTISM COMPASS</h1>
        <div className="welcome">WELCOME, NAME</div>
        <img src={logo2} alt="Logo 2" />
      </header>
      <nav className="menu">
        <a href="#">Home</a>
        <a href="#">Childs</a>
        <a href="#">Quiz</a>
        <a href="#">Health Professionals</a>
        <a href="#">Therapy</a>
        <a href="#">Products</a>
        <a href="#">Carts</a>
        <a href="#">Delivery</a>
        <a href="#">Courses</a>
        <a href="#">Disorder</a>
        <a href="#">Parent</a>
        <a href="#">Profile</a>
      </nav>
    </div>
  );
}

export default Dashboard;
