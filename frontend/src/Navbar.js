import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
   const [isProductsHovered, setIsProductsHovered] = useState(false);
   const [isHovered, setIsHovered] = useState(false);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [userType, setUserType] = useState(null);

   const navigate = useNavigate();


   useEffect(() => {
      const userDataString = localStorage.getItem('USER');
      if (userDataString) {
         const userData = JSON.parse(userDataString);
         setUserType(userData.TYPE);
      }
   }, []);

   const handleLogOut = () => {
      localStorage.removeItem('USER');
      navigate('/login');
   };


   return (
      <nav className="navbar">
         <div className="navbar-container">
            <Link to="/dashboard" className="navbar-logo">
               <img src="https://newsone.com/wp-content/uploads/sites/22/2023/04/16819915401663.jpg?strip=all&quality=80&w=1024&crop=0,0,100,1024px" className="navbar-logo-img" alt="Logo" />
               <span className="navbar-logo-text">Autism Compass</span>
            </Link>
            <div className={`navbar-links-container ${isMenuOpen ? 'open' : ''}`} id="navbar-sticky">
               <ul className="navbar-links">
                  {userType === 'CHILD' && (
                     <>
                        <li>
                           <Link to="/parent-child" className="navbar-link">Parent</Link>
                        </li>
                        <li>
                           <Link to="/HealthProfessionals" className="navbar-link">Health Professionals</Link>
                        </li>
                        <li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsHovered(true)}
                           onMouseLeave={() => setIsHovered(false)}
                        >
                           <Link to="/Therapy" className="navbar-link">Therapy</Link>
                           {isHovered && (
                              <div className="products-dropdown">
                                 <Link to="/therapy" className="navbar-link">Available Therapy</Link>
                                 <Link to="/therapy/booked" className="navbar-link">Booked Therapy</Link>
                                 <Link to="/therapy/org" className="navbar-link">Therapy Organizations</Link>
                              </div>
                           )}
                        </li>
                        <li>
                           <Link to="/courses" className="navbar-link">Courses</Link>
                        </li>
                        <li>
                           <Link to="/disorder" className="navbar-link">Disorder</Link>
                        </li>
                        <li>
                           <Link to="/profile" className="navbar-link">Profile</Link>
                        </li>
                     </>
                  )}
                  {userType === 'PARENT' && (
                     <>
                        <li>
                           <Link to="/parent-child" className="navbar-link">Child</Link>
                        </li>
                        <li>
                           <Link to="/HealthProfessionals" className="navbar-link">Health Professionals</Link>
                        </li>
                        <li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsHovered(true)}
                           onMouseLeave={() => setIsHovered(false)}
                        >
                           <Link to="/Therapy" className="navbar-link">Therapy</Link>
                           {isHovered && (
                              <div className="products-dropdown">
                                 <Link to="/therapy" className="navbar-link">Available Therapy</Link>
                                 <Link to="/therapy/booked" className="navbar-link">Booked Therapy</Link>
                                 <Link to="/therapy/org" className="navbar-link">Therapy Organizations</Link>
                              </div>
                           )}
                        </li>
                        <li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsProductsHovered(true)}
                           onMouseLeave={() => setIsProductsHovered(false)}
                        >
                           <Link to="/Products" className="navbar-link">Products</Link>
                           {isProductsHovered && (
                              <div className="products-dropdown">
                                 <Link to="/products" className="navbar-link">Products</Link>
                                 <Link to="/products/detail/checkout" className="navbar-link">Cart</Link>
                                 <Link to="/delivery" className="navbar-link">Delivery</Link>
                              </div>
                           )}
                        </li>
                        <li>
                           <Link to="/profile" className="navbar-link">Profile</Link>
                        </li>
                     </>
                  )}
                  {userType === 'HEALTH_PROFESSIONAL' && (
                     <li>
                        <Link to="/profile" className="navbar-link">Profile</Link>
                     </li>
                  )}
                  {userType === 'TEACHER' && (
                     <>
                        <li>
                           <Link to="/courses" className="navbar-link">Courses</Link>
                        </li>
                        <li>
                           <Link to="/profile" className="navbar-link">Profile</Link>
                        </li>
                     </>
                  )}
               </ul>
            </div>
            <div className="navbar-buttons">
               <button className="navbar-button" onClick={handleLogOut}>Log Out</button>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
