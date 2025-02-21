import React, { createContext, useReducer, useEffect } from 'react';
import { getProductsList } from '../api/api';
import { shuffleArray } from '../util/util';

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
      const productsList = await getProductsList(); // getProductsList(state.category);
      const products = shuffleArray(productsList);
      for (let i = 0; i < products.length; i++) {
        products[i].special = i < (products.length * 0.4);
      }
      dispatch({ type: 'SET_PRODUCTS', payload: products });
    };

    fetchProducts();
  }, []); // state.category, state.products

  const setCategory = (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  };

  const setProducts = (products) => {
    dispatch({ type: 'SET_PRODUCTS', payload: products });
  };

  return (
    <ProductContext.Provider value={{ ...state, setCategory, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;