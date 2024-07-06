import React from 'react';
import Navbar from '../../Navbar';
import MainContent from './mainContent';
import "./mainContent.css"; // Ensure this CSS file has the combined styles

const ProductList = () => {
    return (
           <div className='container1'>        
            <Navbar/>
            <MainContent />
            </div>
    );
};

export default ProductList;
