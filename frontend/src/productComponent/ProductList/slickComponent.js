import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./mainContent.css";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddCart from "../AddCart";

const SlickComponent = ({ products }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [productCards, setProductCards] = useState([]);
    const navigate = useNavigate();

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

    const handleClick = (productID) => {
        navigate(`/products/detail?ID=${productID}`);
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
