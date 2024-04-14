import React, { createContext, useState, useEffect } from 'react';
import loadedData from "../random_data.json"

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({ items: [], promotionItems: [], cartItems: [] });

    useEffect(() => {
        const fetchData = () => {
            try {
                setData({
                    items: loadedData.items,
                    promotionItems: loadedData.promotion_items,
                    cartItems: loadedData.cart_items,
                });
            } catch (error) {
                console.error('Error loading the JSON file:', error);
            }
        };
    
        fetchData();
    }, []);

    const addToCart = (newItem, q) => {
        setData((prevData) => {
            const existingItemIndex = prevData.cartItems.findIndex(item => item.id === newItem.id);
            if (existingItemIndex >= 0) {
                // Item already exists in the cart, update the quantity
                const updatedCartItems = prevData.cartItems.map((item, index) =>
                    index === existingItemIndex ? { ...item, quantity: item.quantity + q } : item
                );
                return {
                    ...prevData,
                    cartItems: updatedCartItems,
                };
            } else {
                // Item not in the cart, add it with quantity 1
                const newItemWithQuantity = { ...newItem, quantity: q };
                return {
                    ...prevData,
                    cartItems: [newItemWithQuantity, ...prevData.cartItems],
                };
            }
        });
    };

    const deleteFromCart = (id) => {
        setData((prevData) => ({
            ...prevData,
            cartItems: prevData.cartItems.filter((value) => value.id !== id),
        }));
    };

    const updateQuantity = (name, newQuantity) => {
        setData((prevData) => ({
            ...prevData,
            cartItems: prevData.cartItems.map((item, _) =>
                item.name === name ? { ...item, quantity: newQuantity } : item
            ),
        }));
    };

    return (
        <DataContext.Provider value={{ data, addToCart, deleteFromCart, updateQuantity }}>
            {children}
        </DataContext.Provider>
    );
};
