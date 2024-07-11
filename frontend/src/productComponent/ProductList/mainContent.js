import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./mainContent.css";

const MainContent = () => {
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

    const listItems = productCards.map((item) =>
        <div className="card" key={item.PR_ID}>
            <div className="card-img">
                <img src={item.SRC} alt={item.NAME} />
            </div>
            <div className="card_header">
                <h2>{item.NAME}</h2>
                <p>{item.DESCRIPTION}</p>
                <p className="price"> {item.PRICE}<span> BDT</span></p>
                <button className="button-57" onClick={() => { handleClick(item.PR_ID) }}>
                    <span className="text" >Buy Now</span>
                    <span>check product</span>
                </button>
            </div>
        </div>
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!productCards.length) return <div>No products found</div>;

    return (
        <div className="main_content">
            <h3>Autism Products</h3>
            {listItems}
        </div >
    );
}
export default MainContent;
