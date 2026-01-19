import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { fetchCart, addToCart, updateCart, removeFromCart, getProduct } from '../api/api';
import { AuthContext } from './AuthContext';
import ProductContext from './ProductContext';
import Toast from '../components/Toast/Toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { products } = useContext(ProductContext);

  const emptyCart = useRef({
    id: '',
    userId: '',
    items: [],
    itemsCount: 0,
    total: 0,
  }).current;

  const [cart, setCart] = useState(emptyCart);
  const [order, setOrder] = useState(null);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'error' });
  const [loadingItems, setLoadingItems] = useState(new Set());

  // Helper: Show toast notification
  const showToast = (message, severity = 'error') => {
    setToast({ open: true, message, severity });
  };

  // Helper: Close toast
  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  // Helper: Calculate optimistic cart after adding an item
  const calculateOptimisticAddCart = async (currentCart, itemId) => {
    const existingItemIndex = currentCart.items.findIndex(item => item.productId === itemId);
    
    let newItems;
    if (existingItemIndex >= 0) {
      // Item exists, increment quantity
      newItems = [...currentCart.items];
      newItems[existingItemIndex] = {
        ...newItems[existingItemIndex],
        qty: newItems[existingItemIndex].qty + 1,
        subtotal: newItems[existingItemIndex].price * (newItems[existingItemIndex].qty + 1),
      };
    } else {
      // Item doesn't exist, fetch product data and add to cart
      let productData = products.find(p => p.id === itemId);
      
      if (!productData) {
        // Fallback: fetch from API if not in ProductContext
        productData = await getProduct(itemId);
      }
      
      newItems = [
        ...currentCart.items,
        {
          id: Date.now(), // Temporary ID
          cartId: currentCart.id,
          productId: itemId,
          qty: 1,
          name: productData.name,
          price: productData.price,
          description: productData.description,
          category: productData.category,
          preview: productData.preview,
          subtotal: productData.price,
        },
      ];
    }

    const newTotal = newItems.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2);
    const newItemsCount = newItems.reduce((sum, item) => sum + item.qty, 0);

    return {
      ...currentCart,
      items: newItems,
      total: parseFloat(newTotal),
      itemsCount: newItemsCount,
    };
  };

  // Helper: Calculate optimistic cart after removing an item
  const calculateOptimisticRemoveCart = (currentCart, itemId, qtyToRemove) => {
    const existingItemIndex = currentCart.items.findIndex(item => item.productId === itemId);
    
    if (existingItemIndex < 0) {
      return currentCart; // Item not found, no change
    }

    let newItems;
    const existingItem = currentCart.items[existingItemIndex];
    const newQty = existingItem.qty - qtyToRemove;

    if (newQty <= 0) {
      // Remove item completely
      newItems = currentCart.items.filter((_, index) => index !== existingItemIndex);
    } else {
      // Decrease quantity
      newItems = [...currentCart.items];
      newItems[existingItemIndex] = {
        ...existingItem,
        qty: newQty,
        subtotal: existingItem.price * newQty,
      };
    }

    const newTotal = newItems.length > 0 
      ? newItems.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)
      : 0;
    const newItemsCount = newItems.length > 0
      ? newItems.reduce((sum, item) => sum + item.qty, 0)
      : 0;

    return {
      ...currentCart,
      items: newItems,
      total: parseFloat(newTotal),
      itemsCount: newItemsCount,
    };
  };

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
    // Add to loading state
    setLoadingItems(prev => new Set(prev).add(itemId));
    
    // Store previous cart state for rollback
    const previousCart = { ...cart, items: [...cart.items] };
    
    try {
      // Step 1: Optimistically update the cart
      const optimisticCart = await calculateOptimisticAddCart(cart, itemId);
      setCart(optimisticCart);
      localStorage.setItem('cart', JSON.stringify(optimisticCart));

      // Step 2: Sync with server in the background
      let cartId = '';
      const storedCart = await JSON.parse(localStorage.getItem('cart'));
      if (storedCart) {
        cartId = storedCart.id;
      }
      
      const serverCart = await addToCart(itemId, cartId);
      
      // Step 3: Update with server response (ensures consistency)
      setCart(serverCart);
      localStorage.setItem('cart', JSON.stringify(serverCart));
    } catch (error) {
      console.error('Failed to add item to cart', error);
      
      // Rollback to previous state
      setCart(previousCart);
      localStorage.setItem('cart', JSON.stringify(previousCart));
      
      // Show error notification
      showToast('Failed to add item to cart. Please try again.');
    } finally {
      // Remove from loading state
      setLoadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
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
    // Add to loading state
    setLoadingItems(prev => new Set(prev).add(itemId));
    
    // Store previous cart state for rollback
    const previousCart = { ...cart, items: [...cart.items] };
    
    try {
      // Step 1: Optimistically update the cart
      const optimisticCart = calculateOptimisticRemoveCart(cart, itemId, qtyToRemove);
      setCart(optimisticCart);
      localStorage.setItem('cart', JSON.stringify(optimisticCart));

      // Step 2: Sync with server in the background
      const serverCart = await removeFromCart(itemId, cart.id, qtyToRemove);
      
      // Step 3: Update with server response (ensures consistency)
      setCart(serverCart);
      localStorage.setItem('cart', JSON.stringify(serverCart));
    } catch (error) {
      console.error('Failed to remove item from cart', error);
      
      // Rollback to previous state
      setCart(previousCart);
      localStorage.setItem('cart', JSON.stringify(previousCart));
      
      // Show error notification
      showToast('Failed to update cart. Please try again.');
    } finally {
      // Remove from loading state
      setLoadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
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
        setOrder,
        loadingItems,
      }}
    >
      {children}
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleCloseToast}
      />
    </CartContext.Provider>
  );
};
