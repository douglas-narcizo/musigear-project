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

/**
 * The following accessory logic was created only to randomly select
 * daily specials for demonstration purposes.
 * In real life, specials are set by real people from the store's team
 * and this logic must be removed.
 */
const sortByCategoryRoundRobin = (productsList) => {
  const categoryMap = productsList.reduce((map, product) => {
    if (!map[product.category]) {
      map[product.category] = [];
    }
    map[product.category].push(product);
    return map;
  }, {});

  const sortedProducts = [];
  const categoryKeys = Object.keys(categoryMap);

  while (categoryKeys.some((key) => categoryMap[key].length > 0)) {
    for (const key of categoryKeys) {
      if (categoryMap[key].length > 0) {
        sortedProducts.push(categoryMap[key].shift());
      }
    }
  }

  return sortedProducts;
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsList = await getProductsList(); // getProductsList(state.category);
      let products = shuffleArray(productsList);
      const sortedProducts = sortByCategoryRoundRobin(products);
      for (let i = 0; i < sortedProducts.length; i++) {
        sortedProducts[i].special = i < (sortedProducts.length * 0.4);
      }
      products = shuffleArray(sortedProducts);
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