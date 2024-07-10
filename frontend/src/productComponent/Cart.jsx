import React, { useState } from 'react';
import Nabvar from '../Navbar';
import Button from "./Button";
import './Cart.css';
// import '../App.css';

const Cart = () => {
   const [cart, setCart] = useState([
      { id: 1, name: 'Cotton T-shirt', price: 44.00, quantity: 1 },
      { id: 2, name: 'Cotton T-shirt', price: 44.00, quantity: 1 },
      { id: 3, name: 'Cotton T-shirt', price: 44.00, quantity: 1 },
      { id: 4, name: 'Cotton T-shirt', price: 44.00, quantity: 1 },
      { id: 5, name: 'Cotton T-shirt', price: 44.00, quantity: 1 },
      { id: 6, name: 'Cotton T-shirt', price: 44.00, quantity: 1 },
      { id: 7, name: 'Cotton T-shirt', price: 44.00, quantity: 1 },
      { id: 8, name: 'Cotton T-shirt', price: 44.00, quantity: 1 },
   ]);

   const handleQuantityChange = (id, quantity) => {
      setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
   };

   const handleRemoveItem = (id) => {
      setCart(cart.filter(item => item.id !== id));
   };

   const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
   const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

   return (
      <div className='main-app'>
         <Nabvar />
         <div className="cart-container">
            <div className="cart-header">
               <h2>Shopping Cart</h2>
            </div>
            <div className="cart">
               <div className="cart-items-summary">
                  <div className="cart-items">
                     {cart.map(item => (
                        <div key={item.id} className="cart-item">
                           <img src="https://fabrilife.com/products/63bd1cfa1318c-square.png" alt={item.name} />
                           <div className="item-details">
                              <p>Shirt</p>
                              <p>{item.name}</p>
                              <p>€ {item.price.toFixed(2)}</p>
                              <div className="quantity">
                                 <button
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                                    -
                                 </button>
                                 <input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))} />
                                 <button
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                                    +
                                 </button>
                              </div>
                           </div>
                           <button
                              className="remove" onClick={() => handleRemoveItem(item.id)}>
                              ×
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="summary">
                  <h3>Summary</h3>
                  <div className="shipping-things">
                     <label>City</label>
                     <input type="text" placeholder="Enter City" className="shipping" />
                     <label>Street</label>
                     <input type="text" placeholder="Enter Street" className="shipping" />
                     <label>House No</label>
                     <input type="text" placeholder="Enter House No" className="shipping" />
                     <label>Assigned Delivery Man</label>
                     <input type="text" className='shipping' placeholder='Arif Abdullah' disabled />
                     <label htmlFor="shipping">Delivery Type</label>
                     <select id='shipping' className='shipping'>
                        <option value="5" className='shipping'>Standard-Delivery - €5.00</option>
                        <option value="5" className='shipping'>Super Fast Delivery - €10.00</option>
                     </select>
                  </div>
                  <div className='total-price'>
                     <div className='sub-total'>
                        <p>SUBTOTAL</p>
                        <p>TOTAL PRICE</p>
                     </div>
                     <div className='final-total'>
                        <p>: {(totalPrice + 5).toFixed(1)}€</p>
                        <p>: {(totalPrice + totalPrice * .05)}€</p>
                     </div>
                  </div>
                  <div className="checkout">
                     <Button />
                  </div>
                  {/* <button className="checkout">CHECKOUT</button> */}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Cart;
