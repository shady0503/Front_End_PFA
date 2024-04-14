import CartItem from "./cartItem";
import './Cart.css'

import { useContext, useEffect, useState } from "react";
import { DataContext } from "../dataContext";

export default function Cart() {

    const { data, deleteFromCart, updateQuantity } = useContext(DataContext)
    const { items, promotionItems, cartItems } = data






    return (
        <div className="cart-container">
            <button className="btn return">Continue Shopping</button>

            <div className="shopping-cart-title">
                <h6>Shopping Cart</h6>
                <p>you have {cartItems.length}  elements in your cart</p>
            </div>

            <div className="items-container">
                {       cartItems.map((value, index) => (
                            <CartItem
                                key={value.id}
                                item={value}
                                onDeleteItem={() => deleteFromCart(value.id)}
                                updateQuantity={updateQuantity}
                            />
                        ))
                }

            </div>

            <h4 className="total">{cartItems.reduce((accumulator, item) => {
                const normalizedPrice = item.price.replace(/[^0-9.-]+/g, '');
                const price = Number(normalizedPrice)
                return accumulator + price * item.quantity;
            }, 0).toFixed(2)} $</h4>

            <button className="btn check-out-btn">Check Out</button>
        </div>


    )
}