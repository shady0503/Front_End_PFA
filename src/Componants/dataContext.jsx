import React, { createContext, useState, useEffect } from 'react';
import '../random_data.json'
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({ items: [], promotionItems: [], cartItems: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonUrl = '/src/random_data.json';
                const response = await fetch(jsonUrl);
                const loadedData = await response.json();
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
    
    
    useEffect(() => {
        console.log(data);
    }, [data]);



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
