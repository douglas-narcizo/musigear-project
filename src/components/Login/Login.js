import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { userLogin } from '../../api/api';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await userLogin(email, password);
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
        console.log(userData);
        setUser(userData);
        navigate('/user');
      }
    } catch (error) {
      alert('Login error!');
      return error;
    }
  };

  return (
    <div className="Login-container">
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 2,
        border: 'InfoText',
      }}
    >
      <Stack direction="column" justifyContent="space-between">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            id="password"
            label="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button variant="contained" endIcon={<SendIcon />} type="submit">
            Login
          </Button>
        </form>
      </Stack>
    </Box>
    </div>
  );
}
