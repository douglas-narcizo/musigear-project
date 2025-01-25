import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function User() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
//  console.log(localStorage.getItem('user'));
    return (
      <Container>
        {user ? (
          <Stack>
            <Typography variant='h3' component='h1' sx={{ my:4 }}>User</Typography>
            <Typography variant='h4' component='h3'>Welcome, {user.firstName} {user.lastName}!</Typography>
            <p>ID: {user.id}</p>
            <Box>
            {cart ?
              <Button
                variant='contained'
                sx={{ mr: 2 }}
                onClick={() => navigate('/shopping-cart')}
              >
                View Cart
              </Button>
            : null }
              <Button variant='outlined' onClick={logout}>Logout</Button>
            </Box>
          </Stack>
        ) : (
          <h2>Please, <Link to="/login">login</Link>!</h2>
        )
      }
      </Container>
    );
}