import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { createOrder } from '../api/api';
import { currency } from '../util/util';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ShoppingCart() {
  const { cart, handleRemoveFromCart, setOrder } = useContext(CartContext);
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
        cart.items.map((item) => (
          <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
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
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'grey.600' }}>{item.description}</Typography>
                <Typography variant="body2">Qty: {item.qty}</Typography>
                <Typography variant="body2">Unitary price: {item.price}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ marginRight: 2 }}>
                {currency.format(item.price * item.qty)}
              </Typography>
              <Button variant="outlined" onClick={() => handleRemoveFromCart(item.productId)}>
                Remove
              </Button>
            </Box>
          </Box>
        ))
      )}
      {cart && cart.items && cart.items.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Typography variant="h5" sx={{ marginRight: 2 }}>
            Total: {currency.format(cart.total)}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => handleCreateOrder()}>
            Checkout
          </Button>
        </Box>
      )}
    </Container>
  );
};
