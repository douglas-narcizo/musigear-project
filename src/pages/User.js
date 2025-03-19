import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function User() {
  const { user, logout, verifySession } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await verifySession();
      setLoading(false);
    };
    verify();
  }, [verifySession]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

/*   if (!user) {
    navigate('/login');
    return null; // Prevent rendering until navigation is complete
  } */

  return (
    <Container>
      <Box height='70vh' component={Paper} position='relative' sx={{ p: '5%', mt: 4 }}>
      <Box height='12rem' width='100%' bgcolor='primary.main' position='absolute' top={0} left={0} sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
        <Typography variant='h3' component='h1' color='primary.contrastText' sx={{ pl:'2rem', mt: '6rem' }}>User page</Typography>
      </Box>
        {user ? (
          <Stack>
            <Box display='flex' sx={{ mt: '13rem', alignItems: 'center' }}>
              <Typography variant='h4' component='h3'>Welcome, {user.firstName} {user.lastName}!</Typography>
              <Avatar
                alt={`${user.firstName} ${user.lastName}`} 
                src={user.picture}
                sx={{ ml: 4, height: '3.2rem', width: '3.2rem', border: 0.5, bgcolor: 'grey.200' }}
              />
            </Box>
            <Divider sx={{ mt: 3 }} />
            <Typography variant='body1' sx={{ my: 4 }}>Select above one of your favorite categories to shop, or:</Typography>
            <Box>
              {cart &&
                <Button
                  variant='contained'
                  endIcon={<ShoppingCartIcon/>}
                  sx={{ px: 3, mr: 3 }}
                  onClick={() => navigate('/shopping-cart')}
                >
                  View Cart
                </Button>
              }
              <Button variant='outlined' onClick={logout}>Logout</Button>
            </Box>
          </Stack>
        ) : (
          <h2>Please, <Link to="/login">login</Link>!</h2>
        )}
      </Box>
    </Container>
  );
}