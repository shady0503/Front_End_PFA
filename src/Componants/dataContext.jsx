import React, { createContext, useState, useEffect } from 'react';
import loadedData from "../random_data.json"
import {Slide, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({ Gaming_Laptops: [], Phones: [], Gaming_Desktop: [], promotionItems: [], cartItems: [] });
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            try {
                setData({
                    Gaming_Laptops: loadedData.Gaming_Laptops,
                    Phones: loadedData.Phones,
                    Gaming_Desktop: loadedData.Gaming_Desktop,
                    promotionItems: loadedData.promotion_items,
                    cartItems: loadedData.cart_items,
                });
                setError(null);
            } catch (error) {
                console.error('Error loading the JSON file:', error);
                setError(error.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const cartData = localStorage.getItem('cartItems');
        if (cartData) {
            setData(prevData => ({
                ...prevData,
                cartItems: JSON.parse(cartData)
            }));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(data.cartItems));
    }, [data.cartItems]);

    const addToCart = (newItem, q) => {
        setData((prevData) => {
            const existingItemIndex = prevData.cartItems.findIndex(item => item.id === newItem.id);
            if (existingItemIndex >= 0) {
                // Update quantity
                const updatedCartItems = prevData.cartItems.map((item, index) =>
                    index === existingItemIndex ? { ...item, quantity: item.quantity + q } : item
                );
                toast.success(`${newItem.name.split('-')[0]} Quantity updated!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                return {
                    ...prevData,
                    cartItems: updatedCartItems,
                };
            } else {
                // Add new item with quantity
                const newItemWithQuantity = { ...newItem, quantity: q };
                toast.success(`${newItem.name.split('-')[0]} Added to cart!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                }); 
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
            cartItems: prevData.cartItems.filter((item) => item.id !== id),
        }));
    };

    const updateQuantity = (id, newQuantity) => {
        setData((prevData) => ({
            ...prevData,
            cartItems: prevData.cartItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            ),
        }));
    };

    return (
        <DataContext.Provider value={{ data, isLoading, error, addToCart, deleteFromCart, updateQuantity }}>
            {children}
        </DataContext.Provider>
    );
};
