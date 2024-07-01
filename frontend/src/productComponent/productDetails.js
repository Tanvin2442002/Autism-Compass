import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './ProductDetails.css'; // Import the CSS file

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/products/${id}`);
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
    }, [id]);

    const addCart = (id) => {
        console.log(`Product ${id} with quantity ${quantity} added to cart`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Product not found</div>;
        
     const totalPrice = product.PRICE * quantity;

    return (
        <div className="product-details">
            <div className="product-image">
                <img 
                    src={product.SRC || "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"} 
                    alt={product.TITLE} 
                />
            </div>
            <div className="product-info">
                <h1>{product.TITLE}</h1>
                <div className="product-meta">
                    <span>Price: ${product.PRICE}</span>
                    <span>Total: ${totalPrice}</span>
                </div>
                <div className="product-description">
                    <p>{product.DESCRIPTION}</p>
                    <p>{product.CONTENT}</p>
                </div>
                <div className="quantity-selector">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                </div>
                <button className="cart-button" onClick={() => addCart(product.ID)}>
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
