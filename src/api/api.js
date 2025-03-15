const backendUrl = process.env.REACT_APP_BACKEND_URL;

// ----- PRODUCTS functions -----

const productRating = () => Math.random() * 1.5 + 3.5;

export const getProductsList = async (category) => {
  let response;
  if (category) {
    response = await fetch(`${backendUrl}/products?category=${category}`, {
      credentials: 'include',
    });
  } else {
    response = await fetch(`${backendUrl}/products`, {
      credentials: 'include',
    });
  }
  const json = await response.json();
  json.forEach(product => product.rating = productRating());
  return json;  
}

export const getProduct = async (productId) => {
  const response = await fetch(`${backendUrl}/products/${productId}`, {
    credentials: 'include',
  });
  const json = await response.json();
  json.rating = productRating();
  return json;
}

// ----- USERS functions -----

export const userLogin = async (email, password) => {
  const response = await fetch(`${backendUrl}/user/login`, {
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
    const response = await fetch(`${backendUrl}/user`, {
      method: 'GET',
      body: JSON.stringify(userId),
      credentials: 'include',
    });
    const json = await response.json();
    return json;
  } else {
    return null;
  }
}

export const registerUser = async (email, password, firstName, lastName) => {
  const response = await fetch(`${backendUrl}/user/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email, password, firstName, lastName }),
    credentials: 'include', // Include credentials in the request
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const json = await response.json();
  return json;
};

export const loginWithGoogle = async () => {
  const response = await fetch(`${backendUrl}/user/google`, {
    method: 'GET',
    credentials: 'include',
  });
  const json = await response.json();
  return json;
}

export const loginWithFacebook = async () => {
  const response = await fetch(`${backendUrl}/user/facebook`, {
    method: 'GET',
    credentials: 'include',
  });
  const json = await response.json();

  // Fetch the profile picture URL using Graph API
  const pictureResponse = await fetch(`https://graph.facebook.com/${json.id}/picture?type=large&redirect=false`, {
    method: 'GET',
  });
  const pictureData = await pictureResponse.json();
  json.picture = pictureData.data.is_silhouette ? `https://api.dicebear.com/9.x/personas/png?seed=${json.firstName}${json.lastName}` : pictureData.data.url;
  return json;
};

export const userLogout = async () => {
  const response = await fetch(`${backendUrl}/user/logout`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
  });
  const json = await response.json();
  return json;
};

export const checkLoginStatus = async () => {
  try {
    const response = await fetch(`${backendUrl}/user/verify-session`, {
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
  const response = await fetch(`${backendUrl}/cart`, {
    credentials: 'include',
  });
  if (!response.ok) {
    return {id: '', userId: '', items: []};
    // throw new Error('Failed to fetch cart');
  }
  return response.json();
};

export const addToCart = async (itemId, cartId = '') => {
  const cartUrl = `${backendUrl}/cart` + (cartId ? `/${cartId}` : '');
  const response = await fetch(cartUrl, {
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

export const updateCart = async (cartId) => {
  const response = await fetch(`${backendUrl}/cart/${cartId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to update cart');
  }
  return response.json();
};

export const removeFromCart = async (itemId, cartId, qtyToRemove) => {
  const response = await fetch(`${backendUrl}/cart/${cartId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({productId:itemId, qty:(-1 * qtyToRemove)}),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to remove item from cart');
  }
  return response.json();
};

// ----- CHECKOUT functions -----

export const createOrder = async (cart) => {
  const response = await fetch(`${backendUrl}/cart/${cart.id}/checkout`, {
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
  const response = await fetch(`${backendUrl}/order/create-payment-intent`, {
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
