import React, { createContext, useState, useEffect } from 'react';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [connected, setConnected] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [userID, setUserID] = useState(undefined)
    const [admin, setAdmin] = useState(undefined)
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setConnected(true);
        } else {
            setConnected(false);
        }
    }, []);

    useEffect(() => {
        const fetchProductData = async (productId) => {
            try {
                const response = await fetch(`/api/getProductbyID?id=${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const { product } = await response.json();
                return product;
            } catch (error) {
                console.error('Error fetching product data:', error);
                return null;
            }
        };
    
        const fetchFullProductDetails = async (cartItems) => {
            return await Promise.all(cartItems.map(async (item) => {
                const product = await fetchProductData(item.productId || item._id);
                return {
                    ...product,
                    quantity: item.quantity
                };
            }));
        };
    
        const fetchData = async () => {
            setLoading(true);
            try {
                const localCartData = JSON.parse(localStorage.getItem('cartItems')) || [];
        
                if (connected) {
                    const token = await localStorage.getItem('token');
                    console.log(token)
                    const response = await fetch('/api/getUserData', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    //lets handle error 403
                    if (response.status === 403) {
                        setConnected(false);
                        console.log("403 error")}
        
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
        
                    const { data } = await response.json();
                    const backendCartItems = data.cart || [];
                    const backendOrders = data.orders || [];
                    setUser(data)
        
                    setAdmin(data.isAdmin);
                    setUserID(data._id);
        
                    const backendCartItemsWithDetails = await fetchFullProductDetails(backendCartItems);
                    const localCartItemsWithDetails = await fetchFullProductDetails(localCartData);
        
                    const mergedCartItems = mergeCartItems(backendCartItemsWithDetails, localCartItemsWithDetails);
        
                    setCartItems(mergedCartItems);
                    setOrders(backendOrders);
        
                    localStorage.removeItem('cartItems');
                } else {
                    const localCartItemsWithDetails = await fetchFullProductDetails(localCartData);
                    setCartItems(localCartItemsWithDetails);
                }
        
                setError(null);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        
    
        fetchData();
    }, [connected]);
    

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const mergeCartItems = (backendCartItems, localCartItems) => {
        const merged = [...backendCartItems];
        localCartItems.forEach(localItem => {
            const index = merged.findIndex(item => item._id === localItem._id);
            if (index >= 0) {
                merged[index].quantity = Math.max(localItem.quantity, merged[index].quantity)
            } else {
                merged.push(localItem);
            }
        });
        return merged;
    };

    const addToCart = (newItem, q) => {
        setCartItems(prevCartItems => {
            const existingItemIndex = prevCartItems.findIndex(item => item._id === newItem._id);
            if (existingItemIndex >= 0) {
                return updateExistingItem(prevCartItems, existingItemIndex, newItem, q);
            } else {
                return addNewItem(prevCartItems, newItem, q);
            }
        });
    };

    const updateExistingItem = (prevCartItems, index, newItem, q) => {
        const currentItem = prevCartItems[index];
        const newQuantity = currentItem.quantity + q;
        if (newQuantity >= 1) {
            const updatedCartItems = prevCartItems.map((item, idx) =>
                idx === index ? { ...item, quantity: newQuantity } : item
            );
            showSuccessToast(`${newItem.name.split('-')[0]} Quantity updated!`);
            return updatedCartItems;
        } else {
            showToastError("Cannot reduce item quantity below 1.");
            return prevCartItems;  // Maintain previous state if the update is invalid
        }
    };

    const addNewItem = (prevCartItems, newItem, q) => {
        if (q >= 1) {
            const newItemWithQuantity = { ...newItem, quantity: q };
            showSuccessToast(`${newItem.name.split('-')[0]} Added to cart!`);
            return [newItemWithQuantity, ...prevCartItems];
        } else {
            showToastError("Quantity must be at least 1 to add to cart.");
            return prevCartItems;  // Maintain previous state if the quantity is invalid
        }
    };

    const saveCartToServer = async () => {
        const token = localStorage.getItem('token');
        if (connected && token) {
            try {
                const response = await fetch('/api/updateCart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ cart: cartItems })
                });

                if (!response.ok) {
                    throw new Error('Failed to save cart to server');
                }

                const data = await response.json();
                if (!data.success) {
                    console.error('Failed to save cart:', data.message);
                } else {
                    localStorage.removeItem('cartItems'); // Clear local storage on successful save
                }
            } catch (error) {
                console.error('Error saving cart to server:', error);
            }
        }
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            saveCartToServer();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [cartItems, connected]);

    const showSuccessToast = (message) => {
        toast.success(message, {
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
    };

    const showToastError = (message) => {
        toast.error(message, {
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
    };

    const deleteFromCart = (id) => {
        setCartItems(prevCartItems => prevCartItems.filter((item) => item._id !== id));
    };

    const updateQuantity = (id, newQuantity) => {
        setCartItems(prevCartItems => prevCartItems.map((item) =>
            item._id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    return (
        <DataContext.Provider value={{ admin, setAdmin,isLoading, error, connected, userID, user, setUserID, setConnected, cartItems, orders, addToCart, deleteFromCart, updateQuantity, saveCartToServer }}>
            {children}
        </DataContext.Provider>
    );
};
