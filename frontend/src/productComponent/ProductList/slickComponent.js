import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./mainContent.css";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickComponent = () => {
    const [productCards, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

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
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, []);

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
        <div className="cardslick" key={item.PR_ID} onClick={() => { handleClick(item.PR_ID) }}>
            <div className="cardslick-img">
                <img src={item.SRC} alt={item.NAME} />
            </div>
            <div className="cardslick-content">
                <h3>{item.NAME}</h3>
                <p>{item.DESCRIPTION}</p>
            </div>
        </div>
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!productCards.length) return <div>No products found</div>;

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
