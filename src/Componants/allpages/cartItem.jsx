import React, { useState } from "react";
import logo from '../../assets/logo.webp';
import './cartItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function CartItem({item, onDeleteItem}) {
    const [quantity, setQuantity] = useState(1);

    const handleDecreaseQuantity = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
    };

    const handleIncreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    return (
(
            <div className="item-container">
                <div className="item-info">
                    <img src={logo} alt="Item Logo" />
                    <h1 className="name">{item.name}</h1> 
                </div>
                <div className="quantity-controls">
                    <button className="btn" onClick={handleDecreaseQuantity}>-</button>
                    <p className="quantity">{quantity}</p>
                    <button className="btn" onClick={handleIncreaseQuantity}>+</button>
                </div>
                <div className="priceandclear">
                <p className="item-price">{(item.price*quantity).toFixed(2)}$</p>
                <div className="clear " onClick={onDeleteItem}>
                    <FontAwesomeIcon icon={faTrash}  />
                </div>
                </div>
            </div>
        )
    );
}
