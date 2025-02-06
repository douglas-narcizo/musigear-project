import React, { createContext, useReducer, useEffect } from 'react';
import { getProductsList } from '../api/api';

const initialState = {
  category: '',
  products: [],
};

const ProductContext = createContext(initialState);

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsList(state.category);
      dispatch({ type: 'SET_PRODUCTS', payload: products });
    };

    fetchProducts();
  }, [state.category]);

  const setCategory = (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  };

  return (
    <ProductContext.Provider value={{ ...state, setCategory }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;