import React, { createContext, useState, useEffect } from 'react';
import { fetchCart, addToCart, removeFromCart } from '../api/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await fetchCart();
        setCart(cartData);
      } catch (error) {
        console.error('Failed to load cart', error);
      }
    };

    loadCart();
  }, []);

  const handleAddToCart = async (item) => {
    try {
      const updatedCart = await addToCart(item);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to add item to cart', error);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      const updatedCart = await removeFromCart(itemId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to remove item from cart', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, handleAddToCart, handleRemoveFromCart }}>
      {children}
    </CartContext.Provider>
  );
};