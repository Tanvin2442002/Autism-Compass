import React, { useState, useEffect } from "react";
import './temp.css';

const Testproductlist = () => {
    const [productCards, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!productCards.length) return <div>No products found</div>;
    console.log(productCards);

    return (
        <div className="container">
            {productCards.map((item) => (
                <div key={item.P_ID} className="card">
                    <div className="imgBx">
                        <img
                            src={item.SRC}
                            alt={item.NAME}
                        />
                    </div>
                    <div className="contentBx">
                        <h2>{item.NAME}</h2>
                        <p>{item.DESCRIPTION}</p>
                        <p>Quantity: {item.QUANTITY}</p>
                        <a href="#">Buy Now</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Testproductlist;
