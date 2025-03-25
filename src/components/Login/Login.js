import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { GoogleIconColor, FacebookIcon } from '../../util/CustomIcons';
import Divider from '@mui/material/Divider';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/user');
    } catch (error) {
      alert('Login error!');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/user/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/user/facebook`;
  };

  return (
    <Container maxWidth='sm' sx={{ height: '83.5vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
          border: 'InfoText',
        }}
      >
        <Stack direction='column' justifyContent='space-between'>
          <Typography variant='h4' component='h1' sx={{fontWeight:600, my: 3}}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id='email'
              label='e-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              id='password'
              label='password'
              value={password}
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button variant='contained' endIcon={<SendIcon />} type='submit'>
              Login
            </Button>
          </form>
          <Box sx={{mt: 4}}>
            Don't have an account?
            <Button
              variant='outlined'
              size='small'
              sx={{ml: 2}}
              onClick={() => navigate('/register')}
            >Sign Up</Button>
          </Box>
          <Divider sx={{my: 2}}>or</Divider>
          <Button
            variant='outlined'
            endIcon={<GoogleIconColor />}
            onClick={handleGoogleLogin}
            sx={{mb: 2}}
          >
            Continue with Google
          </Button>
          <Button
            variant='outlined'
            endIcon={<FacebookIcon />}
            onClick={handleFacebookLogin}
          >
            Continue with Facebook
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
