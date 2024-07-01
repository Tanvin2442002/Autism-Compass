import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/products/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const addCart = (id) => {
        console.log(`Product ${id} added to cart`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="details">
            <div className="card" key={product.id}>
                <img src={product.src} alt={product.Title} />
                <div className="box">
                    <div className="row">
                        <h2>{product.Title}</h2>
                        <span>${product.price}</span>
                    </div>
                    <p>{product.Description}</p>
                    <p>{product.Content}</p>
                    <button className="cart" onClick={() => addCart(product.id)}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
