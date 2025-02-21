import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { createOrder } from '../api/api';
import { currency } from '../util/util';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Incrementer from '../components/Incrementer/Incrementer';

export default function ShoppingCart() {
  const { cart, handleAddToCart, handleRemoveFromCart, setOrder } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCreateOrder = async () => {
    try {
      const orderData = await createOrder(cart);
      console.log('Checkout data:', orderData);
      setOrder(orderData);
      // Clear the cart
      navigate('/checkout');
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };
  
  return (
    <Container maxWidth='md' sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {!cart || !cart.items || cart.items.length === 0 ? (
        <Typography variant="h6">Your cart is empty</Typography>
      ) : (
        <Container component={Paper} sx={{ py: 2 }}>
          <Box display='flex' justifyContent='space-between' sx={{ mx: 1 }}>
            <Typography sx={{ color: 'grey.600' }}>
              Product / Description
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'flex'}}}>
              <Typography sx={{ mr: 4, color: 'grey.600' }}>
                Quantity / Price
              </Typography>
              <Typography sx={{ color: 'grey.600' }}>
                Subtotal
              </Typography>
            </Box>
          </Box>
          {cart.items.map((item) => (
            <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', py: 1, borderTop: '1px solid hsla(0, 0%, 0%, 0.2)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    mr: 2,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid',
                    borderColor: 'grey.500',
                    borderRadius: 1,
                  }}
                >
                  <img
                    src={item.preview}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Box>
                  <Typography variant='h6' lineHeight='1.1' gutterBottom>{item.name}</Typography>
                  <Typography variant='body2' sx={{ fontWeight: 400, color: 'grey.600' }}>{item.description}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', width: { xs: '90%', sm: 'auto'}, justifyContent: 'end' }}>
                <Stack align='center'>
                  <Typography sx={{ mt: 1, color: 'grey.600', display: { xs: 'inline', sm: 'none' } }}>
                    Quantity / Price
                  </Typography>
                  <Incrementer
                    qty={item.qty}
                    onIncrement={() => handleAddToCart(item.productId)}
                    onDecrement={() => handleRemoveFromCart(item.productId)}
                  />
                  <Typography variant='caption' sx={{ fontWeight: 400, color: 'grey.700' }}>
                    unit price:
                  </Typography>
                  <Typography variant='body1' sx={{ fontWeight: 500 }} gutterBottom>
                    {currency.format(item.price)}
                  </Typography>
                  <Button size='small' sx={{ color: 'primary.light', fontWeight: 400 }} onClick={() => handleRemoveFromCart(item.productId)}>
                    Remove
                  </Button>
                </Stack>
                <Stack align='end'>
                  <Typography sx={{ mt: 1, mr: 0.5, color: 'grey.600', display: { xs: 'inline', sm: 'none' } }}>
                    Subtotal
                  </Typography>
                  <Typography variant='h6' component='span' color='primary.main' sx={{ width: '7rem', textAlign: 'right' }}>
                    {currency.format(item.price * item.qty)}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          ))}
        </Container>
      )}
      {cart && cart.items && cart.items.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Stack direction='column' gap={1}>
            <Typography variant='h5' fontWeight={500} sx={{ mx: 2 }}>
              Total: {currency.format(cart.total)}
            </Typography>
            <Button variant='outlined' color='primary' onClick={handleCreateOrder}>
              Proceed to Checkout
            </Button>
            <Button color='primary' onClick={() => navigate('/')}>
              Continue shopping
            </Button>
          </Stack>
        </Box>
      )}
    </Container>
  );
};
