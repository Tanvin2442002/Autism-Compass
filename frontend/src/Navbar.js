import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Navbar = () => {
    const [isProductsHovered, setIsProductsHovered] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/Childs">Childs</Link>
                <Link to="/HealthProfessionals">Health Professionals</Link>
                <div
                    className="navbar-dropdown"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Link to="/Therapy">Therapy</Link>
                    {isHovered && (
                        <div className="products-dropdown">
                            <Link to="/therapy">Available Therapy</Link>
                            <Link to="/therapy/details">Therapy Details</Link>
                            <Link to="/therapy/org">Therapy Organizations</Link>
                        </div>
                    )}
                </div>
                <div
                    className="navbar-dropdown"
                    onMouseEnter={() => setIsProductsHovered(true)}
                    onMouseLeave={() => setIsProductsHovered(false)}
                >
                    <Link to="/Products">Products</Link>
                    {isProductsHovered && (
                        <div className="products-dropdown">
                            <Link to="/Products">Products</Link>
                            <Link to="/Carts">Cart</Link>
                            <Link to="/Delivery">Delivery</Link>
                        </div>
                    )}
                </div>
                <Link to="/Courses">Courses</Link>
                <Link to="/Disorder">Disorder</Link>
                <Link to="/Parent">Parent</Link>
                <Link to="/Profile">Profile</Link>
            </div>
        </nav>
    );
};

export default Navbar;
