const backendUrl = 'http://localhost:4000/api/';

// ----- PRODUCTS functions -----

export const getProductsList = async (category) => {
  const response = await fetch(`${backendUrl}products?category=${category}`);
  const json = await response.json();
  return json;  
}

export const getProduct = async (productId) => {
  const response = await fetch(`${backendUrl}products/${productId}`);
  const json = await response.json();
  return json;
}

// ----- USERS functions -----

export const userLogin = async (email, password) => {
  const response = await fetch(`${backendUrl}user/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: `{"email":"${email}","password":"${password}"}`,
    credentials: 'include',
  });
  const json = await response.json();
  return json;
}

export const getUser = async (userId) => {
  if (userId) {
    const response = await fetch(`${backendUrl}user/${userId}`, {
      method: 'GET',
      credentials: 'include',
    });
    const json = await response.json();
    return json;
  } else {
    console.log('Oh shit!');
    return null;
  }
}

export const userLogout = async () => {
  const response = await fetch(`${backendUrl}user/logout`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  });
  const json = await response.json();
  console.log(json);
  return json;
}

// ----- CART functions -----

export const fetchCart = async () => {
  const response = await fetch(`${backendUrl}cart`);
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  return response.json();
};

export const addToCart = async (item) => {
  const response = await fetch(`${backendUrl}cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error('Failed to add item to cart');
  }
  return response.json();
};

export const removeFromCart = async (itemId) => {
  const response = await fetch(`${backendUrl}cart/${itemId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to remove item from cart');
  }
  return response.json();
};