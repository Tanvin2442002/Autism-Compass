import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./img/puzzlebg.png";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
   const [isProductsHovered, setIsProductsHovered] = useState(false);
   const [isHovered, setIsHovered] = useState(false);
   const [isDocHovered, setIsDocHovered] = useState(false);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [userType, setUserType] = useState(null);

   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      const userDataString = localStorage.getItem("USER");
      if (userDataString) {
         const userData = JSON.parse(userDataString);
         setUserType(userData.TYPE);
      }
   }, []);

   const handleLogOut = () => {
      localStorage.removeItem("USER");
      localStorage.removeItem("REMEMBER_ME");
      navigate("/login");
   };

   const handleCart = () => {
      navigate('/products/detail/checkout')
   }

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <motion.nav
         className="navbar"
         initial={{ y: -100, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0, ease: "easeInOut" }}
      >
         <div className="navbar-container">
            <Link to="/dashboard" className="navbar-logo">
               <motion.img
                  src={Logo}
                  className="navbar-logo-img"
                  alt="Logo"
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, ease: "backInOut" }}
               />
            </Link>
            <button className="navbar-menu-button" onClick={toggleMenu}>
               <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/menu--v1.png"
                  alt="menu"
               />
            </button>
            <div
               className={`navbar-links-container ${isMenuOpen ? "open" : ""}`}
               id="navbar-sticky"
            >
               <ul className="navbar-links">
                  <motion.li
                     initial={{ y: -100, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.15, ease: "backInOut" }}
                  >
                     <Link
                        to="/dashboard"
                        className={`navbar-link ${location.pathname === "/dashboard" ? "active" : ""
                           }`}
                     >
                        Home
                     </Link>
                  </motion.li>
                  {userType === "CHILD" && (
                     <>
                        <motion.li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsDocHovered(true)}
                           onMouseLeave={() => setIsDocHovered(false)}
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.2, ease: "backInOut" }}
                        >
                           <Link
                              to="/HealthProfessionals"
                              className={`navbar-link ${location.pathname.startsWith("/doctor/booked") ||
                                 location.pathname.startsWith("/HealthProfessionals")
                                 ? "active"
                                 : ""
                                 }`}
                           >
                              Doctors
                           </Link>
                           {isDocHovered && (
                              <div className="products-dropdown">
                                 <Link
                                    to="/HealthProfessionals"
                                    className={`navbar-link ${location.pathname == "/HealthProfessionals"
                                       ? "active"
                                       : ""
                                       }`}
                                 >
                                    Available Doctors{" "}
                                 </Link>
                                 <Link
                                    to="/doctor/booked"
                                    className={`navbar-link ${location.pathname.startsWith("/doctor/booked")
                                       ? "active"
                                       : `${location.pathname.startsWith(
                                          "/HealthProfessionals"
                                       )} ? 'active' : ''`
                                       }`}
                                 >
                                    Booked Doctors
                                 </Link>
                                 <Link
                                    to="/doctor/feedback"
                                    className={`navbar-link ${location.pathname.startsWith("/doctor/feedback")
                                       ? "active"
                                       : ""
                                       }`}
                                 >
                                    Feedbacks
                                 </Link>
                              </div>
                           )}
                        </motion.li>
                        <motion.li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsHovered(true)}
                           onMouseLeave={() => setIsHovered(false)}
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.25, ease: "backInOut" }}
                        >
                           <Link
                              to="/therapy"
                              className={`navbar-link ${location.pathname.startsWith("/therapy") ? "active" : ""
                                 }`}
                           >
                              Therapy
                           </Link>
                           {isHovered && (
                              <div className="products-dropdown">
                                 <Link to="/therapy" className={`navbar-link`}>
                                    Available Therapy
                                 </Link>
                                 <Link
                                    to="/therapy/booked"
                                    className={`navbar-link ${location.pathname.startsWith("/therapy/booked")
                                       ? "active"
                                       : ""
                                       }`}
                                 >
                                    Booked Therapy
                                 </Link>
                                 <Link
                                    to="/therapy/org"
                                    className={`navbar-link ${location.pathname.startsWith("/therapy/org")
                                       ? "active"
                                       : ""
                                       }`}
                                 >
                                    Therapy Organizations
                                 </Link>
                              </div>
                           )}
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.3, ease: "backInOut" }}
                        >
                           <Link
                              to="/courses"
                              className={`navbar-link ${location.pathname === "/courses" ? "active" : ""
                                 }`}
                           >
                              Courses
                           </Link>
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.35, ease: "backInOut" }}
                        >
                           <Link
                              to="/disorder"
                              className={`navbar-link ${location.pathname === "/disorder" ? "active" : ""
                                 }`}
                           >
                              Disorder
                           </Link>
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.37, ease: "backInOut" }}
                        >
                           <Link
                              to="/chatbot"
                              className={`navbar-link ${location.pathname === "/chatbot" ? "active" : ""
                                 }`}
                           >
                              CHATBOT
                           </Link>
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.4, ease: "backInOut" }}
                        >
                           <Link
                              to="/profile"
                              className={`navbar-link ${location.pathname === "/profile" ? "active" : ""
                                 }`}
                           >
                              Profile
                           </Link>
                        </motion.li>
                     </>
                  )}
                  {userType === "PARENT" && (
                     <>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.2, ease: "backInOut" }}
                        >
                           <Link
                              to="/parent-child"
                              className={`navbar-link ${location.pathname === "/parent-child" ? "active" : ""
                                 }`}
                           >
                              Child
                           </Link>
                        </motion.li>
                        <motion.li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsDocHovered(true)}
                           onMouseLeave={() => setIsDocHovered(false)}
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.25, ease: "backInOut" }}
                        >
                           <Link
                              to="/HealthProfessionals"
                              className={`navbar-link ${location.pathname.startsWith("/doctor/booked") ||
                                 location.pathname.startsWith("/HealthProfessionals")
                                 ? "active"
                                 : ""
                                 }`}
                           >
                              Doctors
                           </Link>
                           {isDocHovered && (
                              <div className="products-dropdown">
                                 <Link
                                    to="/HealthProfessionals"
                                    className={`navbar-link ${location.pathname == "/HealthProfessionals"
                                       ? "active"
                                       : ""
                                       }`}
                                 >
                                    Available Doctors
                                 </Link>
                                 <Link
                                    to="/doctor/booked"
                                    className={`navbar-link ${location.pathname.startsWith("/doctor/booked")
                                       ? "active"
                                       : `${location.pathname.startsWith(
                                          "/HealthProfessionals"
                                       )} ? 'active' : ''`
                                       }`}
                                 >
                                    Booked Doctors
                                 </Link>
                                 <Link
                                    to="/doctor/feedback"
                                    className={`navbar-link ${location.pathname.startsWith("/doctor/feedback")
                                       ? "active"
                                       : ""
                                       }`}
                                 >
                                    Feedbacks
                                 </Link>
                              </div>
                           )}
                        </motion.li>
                        <motion.li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsHovered(true)}
                           onMouseLeave={() => setIsHovered(false)}
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.3, ease: "backInOut" }}
                        >
                           <Link
                              to="/therapy"
                              className={`navbar-link ${location.pathname.startsWith("/therapy") ? "active" : ""
                                 }`}
                           >
                              Therapy
                           </Link>
                           {isHovered && (
                              <div className="products-dropdown">
                                 <Link to="/therapy" className={`navbar-link `}>
                                    Available Therapy
                                 </Link>
                                 <Link
                                    to="/therapy/booked"
                                    className={`navbar-link ${location.pathname.startsWith("/therapy/booked")
                                       ? "active"
                                       : ""
                                       }`}
                                 >
                                    Booked Therapy
                                 </Link>
                                 <Link
                                    to="/therapy/org"
                                    className={`navbar-link ${location.pathname.startsWith("/therapy/org")
                                       ? "active"
                                       : ""
                                       }`}
                                 >
                                    Therapy Organizations
                                 </Link>
                              </div>
                           )}
                        </motion.li>
                        <motion.li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsProductsHovered(true)}
                           onMouseLeave={() => setIsProductsHovered(false)}
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.35, ease: "backInOut" }}
                        >
                           <Link
                              to="/products"
                              className={`navbar-link ${location.pathname.startsWith("/products") ? "active" : ""
                                 }`}
                           >
                              Products
                           </Link>
                           {isProductsHovered && (
                              <div className="products-dropdown">
                                 <Link to="/products" className={`navbar-link`}>
                                    Products
                                 </Link>
                                 <Link
                                    to="/products/detail/checkout"
                                    className={`navbar-link ${location.pathname.startsWith(
                                       "/products/detail/checkout"
                                    )
                                       ? "active"
                                       : ""
                                       }`}
                                 >
                                    Cart
                                 </Link>
                                 <Link
                                    to="/products/orders"
                                    className={`navbar-link ${location.pathname.startsWith("/products/orders")
                                       ? "active"
                                       : ""
                                       }`}
                                 >
                                    Delivery
                                 </Link>
                              </div>
                           )}
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.35, ease: "backInOut" }}
                        >
                           <Link
                              to="/chatbot"
                              className={`navbar-link ${location.pathname === "/chatbot" ? "active" : ""
                                 }`}
                           >
                              CHATBOT
                           </Link>
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.4, ease: "backInOut" }}
                        >
                           <Link
                              to="/profile"
                              className={`navbar-link ${location.pathname === "/profile" ? "active" : ""
                                 }`}
                           >
                              Profile
                           </Link>
                        </motion.li>
                     </>
                  )}
                  {userType === "HEALTH_PROFESSIONAL" && (
                     <>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.17, ease: "backInOut" }}
                        >
                           <Link
                              to="/chatbot"
                              className={`navbar-link ${location.pathname === "/chatbot" ? "active" : ""
                                 }`}
                           >
                              CHATBOT
                           </Link>
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.2, ease: "backInOut" }}
                        >
                           <Link
                              to="/profile"
                              className={`navbar-link ${location.pathname === "/profile" ? "active" : ""
                                 }`}
                           >
                              Profile
                           </Link>
                        </motion.li>
                     </>
                  )}
                  {userType === "TEACHER" && (
                     <>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.2, ease: "backInOut" }}
                        >
                           <Link
                              to="/courses"
                              className={`navbar-link ${location.pathname === "/courses" ? "active" : ""
                                 }`}
                           >
                              Courses
                           </Link>
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.22, ease: "backInOut" }}
                        >
                           <Link
                              to="/chatbot"
                              className={`navbar-link ${location.pathname === "/chatbot" ? "active" : ""
                                 }`}
                           >
                              CHATBOT
                           </Link>
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.25, ease: "backInOut" }}
                        >
                           <Link
                              to="/profile"
                              className={`navbar-link ${location.pathname === "/profile" ? "active" : ""
                                 }`}
                           >
                              Profile
                           </Link>
                        </motion.li>
                     </>
                  )}
               </ul>
            </div>
            {/* <button className="navbar-button" onClick={handleLogOut}>Log Out</button> */}
            <motion.div
               initial={{ y: -100, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.5, ease: "backInOut" }}
               className="cart-log-out"
            >
               {userType === "PARENT" && (
                  <FontAwesomeIcon
                     onClick={handleCart}
                     icon={faCartShopping}
                     className="nav-cart"
                  />
               )}
               <div onClick={handleLogOut}>
                  <Logout />
               </div>
            </motion.div>
         </div>
      </motion.nav>
   );
   return (
      <motion.nav className="navbar"
         initial={{ y: -100, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0, ease: 'easeInOut' }}

      >
         <div className="navbar-container">
            <Link to="/dashboard" className="navbar-logo">
               <motion.img src={Logo} className="navbar-logo-img" alt="Logo"
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, ease: 'backInOut' }}
               />
            </Link>
            <button className="navbar-menu-button" onClick={toggleMenu}>
               <img src="https://img.icons8.com/ios-glyphs/30/000000/menu--v1.png" alt="menu" />
            </button>
            <div className={`navbar-links-container ${isMenuOpen ? 'open' : ''}`} id="navbar-sticky">
               <ul className="navbar-links">
                  <motion.li
                     initial={{ y: -100, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.15, ease: 'backInOut' }}
                  >
                     <Link to="/dashboard" className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Home</Link>
                  </motion.li>
                  {userType === 'CHILD' && (
                     <>
                        <motion.li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsDocHovered(true)}
                           onMouseLeave={() => setIsDocHovered(false)}
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.2, ease: 'backInOut' }}
                        >
                           <Link
                              to="/HealthProfessionals"
                              className={`navbar-link ${location.pathname.startsWith('/doctor/booked') || location.pathname.startsWith('/HealthProfessionals') ? 'active' : ''}`}>
                              Doctors
                           </Link>
                           {isDocHovered && (
                              <div className="products-dropdown">
                                 <Link to="/HealthProfessionals" className={`navbar-link ${location.pathname == '/HealthProfessionals' ? 'active' : ''}`}>Available Doctors </Link>
                                 <Link
                                    to="/doctor/booked"
                                    className={`navbar-link ${location.pathname.startsWith('/doctor/booked') ? 'active' : `${location.pathname.startsWith('/HealthProfessionals')} ? 'active' : ''`}`}
                                 >Booked Doctors
                                 </Link>
                                 <Link to="/doctor/feedback" className={`navbar-link ${location.pathname.startsWith('/doctor/feedback') ? 'active' : ''}`}>Feedbacks</Link>
                              </div>
                           )}
                        </motion.li>
                        <motion.li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsHovered(true)}
                           onMouseLeave={() => setIsHovered(false)}
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.25, ease: 'backInOut' }}
                        >
                           <Link to="/therapy" className={`navbar-link ${location.pathname.startsWith('/therapy') ? 'active' : ''}`}>Therapy</Link>
                           {isHovered && (
                              <div className="products-dropdown">
                                 <Link
                                    to="/therapy"
                                    className={`navbar-link`}
                                 >Available Therapy
                                 </Link>
                                 <Link
                                    to="/therapy/booked"
                                    className={`navbar-link ${location.pathname.startsWith('/therapy/booked') ? 'active' : ''}`}
                                 >Booked Therapy
                                 </Link>
                                 <Link
                                    to="/therapy/org" className={`navbar-link ${location.pathname.startsWith('/therapy/org') ? 'active' : ''}`}
                                 >Therapy Organizations
                                 </Link>
                              </div>
                           )}
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.3, ease: 'backInOut' }}
                        >
                           <Link to="/courses" className={`navbar-link ${location.pathname === '/courses' ? 'active' : ''}`}>Courses</Link>
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.35, ease: 'backInOut' }}
                        >
                           <Link to="/disorder" className={`navbar-link ${location.pathname === '/disorder' ? 'active' : ''}`}>Disorder</Link>
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.37, ease: 'backInOut' }}
                        >
                           <Link to="/chatbot" className={`navbar-link ${location.pathname === '/chatbot' ? 'active' : ''}`}>CHATBOT</Link>
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.4, ease: 'backInOut' }}
                        >
                           <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>Profile</Link>
                        </motion.li>
                     </>
                  )}
                  {userType === 'PARENT' && (
                     <>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.2, ease: 'backInOut' }}
                        >
                           <Link to="/parent-child" className={`navbar-link ${location.pathname === '/parent-child' ? 'active' : ''}`}>Child</Link>
                        </motion.li>
                        <motion.li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsDocHovered(true)}
                           onMouseLeave={() => setIsDocHovered(false)}
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.25, ease: 'backInOut' }}
                        >
                           <Link
                              to="/HealthProfessionals"
                              className={`navbar-link ${location.pathname.startsWith('/doctor/booked') || location.pathname.startsWith('/HealthProfessionals') ? 'active' : ''}`}>
                              Doctors
                           </Link>
                           {isDocHovered && (
                              <div className="products-dropdown">
                                 <Link to="/HealthProfessionals" className={`navbar-link ${location.pathname == '/HealthProfessionals' ? 'active' : ''}`}>Available Doctors</Link>
                                 <Link
                                    to="/doctor/booked"
                                    className={`navbar-link ${location.pathname.startsWith('/doctor/booked') ? 'active' : `${location.pathname.startsWith('/HealthProfessionals')} ? 'active' : ''`}`}
                                 >Booked Doctors
                                 </Link>
                                 <Link to="/doctor/feedback" className={`navbar-link ${location.pathname.startsWith('/doctor/feedback') ? 'active' : ''}`}>Feedbacks</Link>
                              </div>
                           )}
                        </motion.li>
                        <motion.li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsHovered(true)}
                           onMouseLeave={() => setIsHovered(false)}
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.3, ease: 'backInOut' }}
                        >
                           <Link to="/therapy" className={`navbar-link ${location.pathname.startsWith('/therapy') ? 'active' : ''}`}>Therapy</Link>
                           {isHovered && (
                              <div className="products-dropdown">
                                 <Link
                                    to="/therapy"
                                    className={`navbar-link `}
                                 >Available Therapy
                                 </Link>
                                 <Link
                                    to="/therapy/booked"
                                    className={`navbar-link ${location.pathname.startsWith('/therapy/booked') ? 'active' : ''}`}
                                 >Booked Therapy
                                 </Link>
                                 <Link
                                    to="/therapy/org" className={`navbar-link ${location.pathname.startsWith('/therapy/org') ? 'active' : ''}`}
                                 >Therapy Organizations
                                 </Link>
                              </div>
                           )}
                        </motion.li>
                        <motion.li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsProductsHovered(true)}
                           onMouseLeave={() => setIsProductsHovered(false)}
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.35, ease: 'backInOut' }}
                        >
                           <Link to="/products" className={`navbar-link ${location.pathname.startsWith('/products') ? 'active' : ''}`}>Products</Link>
                           {isProductsHovered && (
                              <div className="products-dropdown">
                                 <Link
                                    to="/products"
                                    className={`navbar-link`}
                                 >Products</Link>
                                 <Link
                                    to="/products/detail/checkout"
                                    className={`navbar-link ${location.pathname.startsWith('/products/detail/checkout') ? 'active' : ''}`}
                                 >Cart</Link>
                                 <Link
                                    to="/products/orders"
                                    className={`navbar-link ${location.pathname.startsWith('/products/orders') ? 'active' : ''}`}
                                 >Delivery</Link>
                              </div>
                           )}
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.35, ease: 'backInOut' }}
                        >
                           <Link to="/chatbot" className={`navbar-link ${location.pathname === '/chatbot' ? 'active' : ''}`}>CHATBOT</Link>
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.4, ease: 'backInOut' }}
                        >
                           <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>Profile</Link>
                        </motion.li>
                     </>
                  )}
                  {userType === 'HEALTH_PROFESSIONAL' && (
                     <>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.17, ease: 'backInOut' }}
                        >
                           <Link to="/chatbot" className={`navbar-link ${location.pathname === '/chatbot' ? 'active' : ''}`}>CHATBOT</Link>
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.2, ease: 'backInOut' }}
                        >
                           <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>Profile</Link>
                        </motion.li>
                     </>

                  )}
                  {userType === 'TEACHER' && (
                     <>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.2, ease: 'backInOut' }}
                        >
                           <Link to="/courses" className={`navbar-link ${location.pathname === '/courses' ? 'active' : ''}`}>Courses</Link>
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.25, ease: 'backInOut' }}
                        >
                           <Link to="/chatbot" className={`navbar-link ${location.pathname === '/chatbot' ? 'active' : ''}`}>CHATBOT</Link>
                        </motion.li>
                        <motion.li
                           initial={{ y: -100, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.30, ease: 'backInOut' }}
                        >
                           <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>Profile</Link>
                        </motion.li>
                     </>
                  )}

               </ul>
            </div>
            {/* <button className="navbar-button" onClick={handleLogOut}>Log Out</button> */}
            <motion.div onClick={handleLogOut}
               initial={{ y: -100, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.5, ease: 'backInOut' }}
            >
               <Logout />
            </motion.div>
         </div>
      </motion.nav>
   );
};

export default Navbar;
