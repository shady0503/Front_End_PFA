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

    const name = item.name.split('-')
    console.log(name[0])

    const normalizedPrice = item.price.replace(/[^0-9.-]+/g, '');
    const price = Number(normalizedPrice)

    return (
(
            <div className="item-container">
                <div className="item-info">
                    <img src={item.img_src} alt="Item Logo" />
                    <h1 className="name">{name[0]}</h1> 
                </div>
                <div className="quantity-controls">
                    <button className="btn" onClick={handleDecreaseQuantity}>-</button>
                    <p className="quantity">{quantity}</p>
                    <button className="btn" onClick={handleIncreaseQuantity}>+</button>
                </div>
                <div className="priceandclear">
                <p className="item-price">${(price*quantity).toFixed(2)}</p>
                <div className="clear " onClick={onDeleteItem}>
                    <FontAwesomeIcon icon={faTrash}  />
                </div>
                </div>
            </div>
        )
    );
}
