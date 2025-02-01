import React from 'react';
// import { Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import OrderResult from '../components/OrderResult/OrderResult';

export default function Complete( props ) {
  const { stripe } = props;
    return (
        <Container maxWidth='sm'>
            <Typography variant='h3' sx={{ my: 4 }}>Order Successful!</Typography>
            <Elements stripe={stripe}>
              <OrderResult />
            </Elements>
        </Container>
    );
};

/*
            <p>Thank you for your purchase. Your order has been placed successfully.</p>
            <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
                <button style={{ padding: '10px 20px', fontSize: '16px' }}>Go to Home</button>
            </Link>
*/