import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./mainContent.css";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddCart from "../AddCart";
import { toast, ToastContainer } from "react-toastify";

const SlickComponent = ({ products }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [PopUp, setPopUp] = useState(false);
    const [productCards, setProductCards] = useState([]);
    const navigate = useNavigate();
    const localData = JSON.parse(localStorage.getItem("USER"));
    useEffect(() => {
        // console.log("Products:", products);
        if (products.length > 0) {
            setProductCards(products);
            setLoading(false);
            setError(false);
            // console.log("Product cards:", productCards);
        } else {
            setError(true);
        }
    }, [products]);

    const handleClick = () => {
        setPopUp(true);
    };
    
  const handleCancel = () => {
    setPopUp(false);
  };

  const handlePopUp = async (itemDetails) => {
    console.log("Local data:", localData);
    console.log("Item added to cart", itemDetails);
    const data = {
      PR_ID: itemDetails.PR_ID,
      P_ID: localData.ID,
      AMOUNT: itemDetails.PRICE,
      QUANTITY: 1,
      DOB: new Date().toISOString().slice(0, 10),
    };

    try {
      const response = await fetch(`http://localhost:5000/products/add/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const status = response.status;
      if (status === 200) {
        toast.success("Product added to cart", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Product is already in the cart", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      console.log("Error in adding to cart", err);
    }

    setPopUp(false);
  };

    const settings = {
        dots: false,
        autoplay: true,
        autoplaySpeed: 1500,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const listItems = productCards.map((item) =>
        <div className="cardslick" key={item.PR_ID} onClick={() => handleClick(item.PR_ID)}>
        {PopUp && (
            <div className="confirmation-dialog">
              <div className="confirmation-dialog-content">
                <p>Do you want to add this product to cart?</p>
                <button className="confirm-btn" onClick={handlePopUp(item)}>
                  Yes
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  No
                </button>
              </div>
            </div>
          )}
            <div className="cardslick-img">
                <img src={item.SRC} alt={item.NAME} />
            </div>
            <div className="cardslick-content">
                <h2>{item.NAME}</h2>
                <p>{item.DESCRIPTION}</p>
            </div>
            <div className="card-footer">
                <div className="card-button">
                    <AddCart price={item.PRICE} />
                </div>
            </div>
        </div>
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: No products found</div>;

    return (
        <div className='slider-container'>
            <h1>Autism Compass Stationary</h1>
            <Slider {...settings}>
                {listItems}
            </Slider>
        </div>
    );
};

export default SlickComponent;
