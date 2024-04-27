import React, { useContext, useEffect, useState } from "react";
import './cartItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { DataContext } from "../dataContext";

export default function CartItem({ item, onDeleteItem, updateQuantity }) {
    const [quantity, setQuantity] = useState(item.quantity);
    const {addToCart}= useContext(DataContext)



    const handleDecreaseQuantity = () => {
        setQuantity(prevQuantity => {
            const newQuantity = Math.max(prevQuantity - 1, 1);
            addToCart(item, -1)
            return newQuantity;
        });
    };

    const handleIncreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
        addToCart(item, 1)
        
    };

    useEffect(() => {
        updateQuantity(item.name, quantity);
    }, [quantity]);


    const name = item.name.split('-')

    const normalizedPrice = item.price.replace(/[^0-9.-]+/g, '');
    const price = Number(normalizedPrice)

    return (
        (
            <div className="item-container">
                <div className="item-info">
                    <img src={item.mainImg} alt="Item" />
                    <h1 className="name">{name[0]}</h1>
                </div>
                <div className="quantity-controls">
                    <button className="btn" onClick={handleDecreaseQuantity}>-</button>
                    <p className="quantity">{quantity}</p>
                    <button className="btn" onClick={handleIncreaseQuantity}>+</button>
                </div>
                <div className="priceandclear">
                    <p className="item-price">£{(price * quantity).toFixed(2)}</p>
                    <div className="clear" onClick={() => onDeleteItem(item.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </div>

                </div>
            </div>
        )
    );
}
