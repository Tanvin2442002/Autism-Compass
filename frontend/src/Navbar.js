import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Navbar = () => {
    const [isProductsHovered, setIsProductsHovered] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/childs">Childs</Link>
                <Link to="/healthProfessionals">Health Professionals</Link>
                <div
                    className="navbar-dropdown"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Link to="/therapy">Therapy</Link>
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
                            <Link to="/products">Products</Link>
                            <Link to="/carts">Cart</Link>
                            <Link to="/delivery">Delivery</Link>
                        </div>
                    )}
                </div>
                <Link to="/courses">Courses</Link>
                <Link to="/disorder">Disorder</Link>
                <Link to="/parent">Parent</Link>
                <Link to="/profile">Profile</Link>
            </div>
        </nav>
    );
};

export default Navbar;
