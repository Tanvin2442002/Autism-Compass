import React, {useEffect, useState} from "react";
import Navbar from "../../Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlickComponent from "./slickComponent";
import MainContent from "./mainContent";
import "./slickComponent.css";
import "./mainContent.css"; // Ensure this CSS file has the combined styles


const ProductList = () => {
  const [productCards, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        setProduct(data);
      } catch (err) {
        // setError(err.message);
      } finally {
        // setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  console.log("Hello", productCards);

  return (
    <div className="container1">
      <Navbar />
      <div className="posSlick">
        <SlickComponent products = {productCards} />
      </div>
      {/* <MainContent /> */}
    </div>
  );
};

export default ProductList;
