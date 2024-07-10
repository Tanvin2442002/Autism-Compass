import React from "react";
import Navbar from "../../Navbar";
import MainContent from "./mainContent";
import "./mainContent.css"; // Ensure this CSS file has the combined styles
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlickComponent from "./slickComponent";
import "./slickComponent.css";
import "./productlist.css";
import Testproductlist from "./testproductlist";


const ProductList = () => {
  return ( 
    <div className="container1">
      <Navbar />
      <div className="posSlick">
        <SlickComponent />
      </div>
      <MainContent />
      {/* <Testproductlist/> */}
    </div>
  );
};

export default ProductList;
