import React, { createContext, useState, useEffect } from 'react';
import '../random_data.json'
export const DataContext = createContext();
import loadedData from "../random_data.json"

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({ items: [], promotionItems: [], cartItems: [] });

    useEffect(() => {
        const fetchData =  () => {
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
    
    



    const addToCart = (item) => {
        setData((prevData) => ({
            ...prevData,
            cartItems: [item, ...prevData.cartItems],
        }));
    };

    const deleteFromCart = (key)=>{
        setData((prevData) => ({
            ...prevData,
            cartItems: [...prevData.cartItems.filter(((value, indice) => indice !== key))]
        }))
    }
    return (
        <DataContext.Provider value={{data, addToCart, deleteFromCart}}>
            {children}
        </DataContext.Provider>
    );
};
