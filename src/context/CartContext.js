import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { fetchCart, addToCart, removeFromCart } from '../api/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const emptyCart = useRef({
    items: [],
    itemsCount: 0,
    total: 0,
  }).current;
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(emptyCart);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart && !storedCart.length === 0 && !user) {
          setCart(JSON.parse(storedCart));
        } else if (user) {
          const cartData = await fetchCart();
          setCart(cartData);
        } else {
          localStorage.removeItem('cart');
          // setCart(emptyCart);
        }
      } catch (error) {
        console.error('Failed to load cart', error);
      }
    };

    loadCart();
    return () => {
      setCart(emptyCart);
    };
  }, [user, emptyCart]);

  const handleAddToCart = async (item) => {
    try {
      let updatedCart;
      if (user) {
        updatedCart = await addToCart(item);
      } else {
        updatedCart = [...cart, item];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to add item to cart', error);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      let updatedCart;
      if (user) {
        updatedCart = await removeFromCart(itemId);
      } else {
        updatedCart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
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
