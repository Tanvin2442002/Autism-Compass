import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './img/logo.png';
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';

const Navbar = () => {
   const [isProductsHovered, setIsProductsHovered] = useState(false);
   const [isHovered, setIsHovered] = useState(false);
   const [isDocHovered, setIsDocHovered] = useState(false);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [userType, setUserType] = useState(null);

   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      const userDataString = localStorage.getItem('USER');
      if (userDataString) {
         const userData = JSON.parse(userDataString);
         setUserType(userData.TYPE);
      }
   }, []);

   const handleLogOut = () => {
      localStorage.removeItem('USER');
      localStorage.removeItem('REMEMBER_ME');
      navigate('/login');
   };

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <nav className="navbar">
         <div className="navbar-container">
            <Link to="/dashboard" className="navbar-logo">
               <img src={Logo} className="navbar-logo-img" alt="Logo" />
            </Link>
            <button className="navbar-menu-button" onClick={toggleMenu}>
               <img src="https://img.icons8.com/ios-glyphs/30/000000/menu--v1.png" alt="menu" />
            </button>
            <div className={`navbar-links-container ${isMenuOpen ? 'open' : ''}`} id="navbar-sticky">
               <ul className="navbar-links">
                  <li>
                     <Link to="/dashboard" className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Home</Link>
                  </li>
                  {userType === 'CHILD' && (
                     <>
                        <li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsDocHovered(true)}
                           onMouseLeave={() => setIsDocHovered(false)}
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
                                 <Link to ="/doctor/feedback" className={`navbar-link ${location.pathname.startsWith('/doctor/feedback') ? 'active' : ''}`}>Feedbacks</Link>
                              </div>
                           )}
                        </li>
                        <li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsHovered(true)}
                           onMouseLeave={() => setIsHovered(false)}
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
                        </li>
                        <li>
                           <Link to="/courses" className={`navbar-link ${location.pathname === '/courses' ? 'active' : ''}`}>Courses</Link>
                        </li>
                        <li>
                           <Link to="/disorder" className={`navbar-link ${location.pathname === '/disorder' ? 'active' : ''}`}>Disorder</Link>
                        </li>
                        <li>
                           <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>Profile</Link>
                        </li>
                     </>
                  )}
                  {userType === 'PARENT' && (
                     <>
                        <li>
                           <Link to="/parent-child" className={`navbar-link ${location.pathname === '/parent-child' ? 'active' : ''}`}>Child</Link>
                        </li>
                        <li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsDocHovered(true)}
                           onMouseLeave={() => setIsDocHovered(false)}
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
                                 <Link to ="/doctor/feedback" className={`navbar-link ${location.pathname.startsWith('/doctor/feedback') ? 'active' : ''}`}>Feedbacks</Link>
                              </div>
                           )}
                        </li>
                        <li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsHovered(true)}
                           onMouseLeave={() => setIsHovered(false)}
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
                        </li>
                        <li
                           className="navbar-dropdown"
                           onMouseEnter={() => setIsProductsHovered(true)}
                           onMouseLeave={() => setIsProductsHovered(false)}
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
                        </li>
                        <li>
                           <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>Profile</Link>
                        </li>
                     </>
                  )}
                  {userType === 'HEALTH_PROFESSIONAL' && (
                     <li>
                        <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>Profile</Link>
                     </li>

                  )}
                  {userType === 'TEACHER' && (
                     <>
                        <li>
                           <Link to="/courses" className={`navbar-link ${location.pathname === '/courses' ? 'active' : ''}`}>Courses</Link>
                        </li>
                        <li>
                           <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>Profile</Link>
                        </li>
                     </>
                  )}
               </ul>
            </div>
            {/* <button className="navbar-button" onClick={handleLogOut}>Log Out</button> */}
            <div onClick={handleLogOut}>
               <Logout />
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
