import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import OrderResult from '../components/OrderResult/OrderResult';

export default function Complete( props ) {
  const { stripe } = props;
    return (
        <Container maxWidth='sm'>
            <Typography variant='h3' sx={{ my: 4 }}>Order</Typography>
            <Elements stripe={stripe}>
              <OrderResult />
            </Elements>
        </Container>
    );
};
