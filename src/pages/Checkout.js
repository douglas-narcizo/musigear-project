import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
// import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../api/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
// const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export default function Checkout( props ) {
  const { order } = useContext(CartContext);
  const { stripe } = props;
  const [clientSecret, setClientSecret] = useState('');
  
  useEffect(() => {
    if (!order) {
      return; // navigate('/cart');
    }
    const items = order.items; //[{ description: 'xl-tshirt', amount: 1000 }]; // test item
    // Create PaymentIntent as soon as the page loads
    createPaymentIntent(items)
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [order]);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#349d83',
      colorBackground: '#f0f4f3',
    },
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    <Container maxWidth='sm' sx={{ pt: 2 }}>
      <Typography variant='h3' gutterBottom>Checkout</Typography>
      {clientSecret && (
        <Elements options={{clientSecret, appearance, loader}} stripe={stripe}>
          <Typography
            variant='body1'
            color='warning.main'
            sx={{ fontStyle: 'italic', mb: 2 }}
          >
            Remember: this is a test page only.
            No card will be charged at all. <br />
            Don’t send real sensitive information on this form.
          </Typography>
          <Divider />
          <Typography 
            variant='h5'
            textAlign='center'
            sx={{ fontWeight: 500, mt: 3 }}
            gutterBottom
          >
            Total amount: $ {order.total}
          </Typography>

          <CheckoutForm />

        </Elements>
      )}
    </Container>
  );
}
