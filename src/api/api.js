const backendUrl = 'http://localhost:4000/api/';

// ----- PRODUCTS functions -----

const productRating = () => Math.random() * 1.5 + 3.5;

export const getProductsList = async (category) => {
  const response = await fetch(`${backendUrl}products?category=${category}`);
  const json = await response.json();
  json.forEach(product => product.rating = productRating());
  return json;  
}

export const getProduct = async (productId) => {
  const response = await fetch(`${backendUrl}products/${productId}`);
  const json = await response.json();
  json.rating = productRating();
  return json;
}

// ----- USERS functions -----

export const userLogin = async (email, password) => {
  const response = await fetch(`${backendUrl}user/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({email, password}),
    credentials: 'include',
  });
  const json = await response.json();
  return json;
}

export const getUser = async (userId) => {
  if (userId) {
    const response = await fetch(`${backendUrl}user/`, {
      method: 'GET',
      body: JSON.stringify(userId),
      credentials: 'include',
    });
    const json = await response.json();
    return json;
  } else {
    console.log('User retrieving failed!');
    return null;
  }
}

export const registerUser = async (email, password, firstName, lastName) => {
  const response = await fetch(`${backendUrl}user/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(email, password, firstName, lastName),
  });
  const json = await response.json();
  return json;
}

export const loginWithGoogle = async () => {
  const response = await fetch(`${backendUrl}user/google`, {
    method: 'GET',
    credentials: 'include',
  });
  const json = await response.json();
  return json;
}

export const loginWithFacebook = async () => {
  const response = await fetch(`${backendUrl}user/facebook`, {
    method: 'GET',
    credentials: 'include',
  });
  const json = await response.json();
  return json;
}

export const userLogout = async () => {
  const response = await fetch(`${backendUrl}user/logout`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  });
  const json = await response.json();
  return json;
};

export const checkLoginStatus = async () => {
  try {
    const response = await fetch(`${backendUrl}user/verify-session`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      return false;
    }
    const json = await response.json();
    return json;

  } catch (error) {
    return false;
  }
};

// ----- CART functions -----

export const fetchCart = async () => {
  const response = await fetch(`${backendUrl}cart`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  return response.json();
};

export const addToCart = async (itemId) => {
  const response = await fetch(`${backendUrl}cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({productId:itemId, qty:1}),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to add item to cart');
  }
  return response.json();
};

export const removeFromCart = async (itemId) => {
  const response = await fetch(`${backendUrl}cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({productId:itemId, qty:-1}),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to remove item from cart');
  }
  return response.json();
};

// ----- CHECKOUT functions -----

export const createOrder = async (cart) => {
  const response = await fetch(`${backendUrl}cart/${cart.id}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cart),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  return response.json();
};

export const createPaymentIntent = async (items) => {
  const response = await fetch(`${backendUrl}order/create-payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({items}),
    // credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to create payment intent');
  }
  return response;
}
