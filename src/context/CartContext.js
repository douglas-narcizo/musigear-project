import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { fetchCart, addToCart, updateCart, removeFromCart } from '../api/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const emptyCart = useRef({
    id: '',
    userId: '',
    items: [],
    itemsCount: 0,
    total: 0,
  }).current;

  const [cart, setCart] = useState(emptyCart);
  const [order, setOrder] = useState(null);

  // Synchronize shopping cart when user logs in
  useEffect(() => {
    const loadCart = async () => {
      try {
        let cartData;
        const storedCart = await JSON.parse(localStorage.getItem('cart'));
        if (user) {
          if (storedCart) {
            if (!storedCart.userId) {
              cartData = await updateCart(storedCart.id);
            } else if (storedCart.userId === user.id) {
              cartData = storedCart;
            } else {
              localStorage.removeItem('cart');
              cartData = await fetchCart();
            }
          } else {
            cartData = await fetchCart();
          }
        } else if (storedCart) {
          if (storedCart.userId) {
            localStorage.removeItem('cart');
            cartData = emptyCart;
          } else {
            cartData = storedCart;
          }
        } else {
          cartData = emptyCart;
        }

        setCart(cartData);
        if (cartData.id) {
          localStorage.setItem('cart', JSON.stringify(cartData));
        } // else { localStorage.removeItem('cart'); }
      } catch (error) {
        console.error('Failed to load cart', error);
      }
    };

    loadCart();

    return () => {
      if (cart.userId) {
        setCart(emptyCart);
      }
    };
  }, [user, emptyCart, cart.userId]);

/*
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
*/

  const handleAddToCart = async (itemId) => {
    try {
      let cartId = '';
      const storedCart = await JSON.parse(localStorage.getItem('cart'));
      if (storedCart) {
        cartId = storedCart.id;
      }
      const updatedCart = await addToCart(itemId, cartId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to add item to cart', error);
    }
  };

  /*
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
  */
  
  const handleRemoveFromCart = async (itemId, qtyToRemove) => {
    try {
      const updatedCart = await removeFromCart(itemId, cart.id, qtyToRemove);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to remove item from cart', error);
    }
  };

  /*
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


  const handleCheckout = async () => {
    try {
      const orderData = await createOrder(cart);
      console.log('Checkout data:', orderData);
      // Clear the cart
      // setCart(emptyCart);
    } catch (error) {
      console.error('Failed to checkout', error);
    }
  };
  */

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleRemoveFromCart,
        order,
        setOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
