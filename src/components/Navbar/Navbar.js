import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import './Navbar.css';

const pages = [
  {name:'Home', path:'/'},
  {name:'Shopping Cart', path:'/shopping-cart'},
  {name:'Checkout', path:'/checkout'},
];

function Navbar() {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  }
  
  return (
    <AppBar
      position='sticky'
      sx={{
        background: 'linear-gradient(8deg,hsl(347, 65%, 43%) 30%,hsl(21, 78%, 48%) 90%)',
      }}
    >
      <Container maxWidth='xl' sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant='h3' component='h1' fontWeight='500' fontStyle='italic'
          sx={{ ml: 4, mt: 2, letterSpacing: 4, color: 'primary.contrastText', display: 'inline-flex' }}
        >
          MusiGear
        </Typography>

        <Box sx={{ mr: 4, mt: 2, flexGrow: 1, textAlign: 'right' }}>
          <IconButton size='large'>
            {cart.itemsCount ?
              <Badge badgeContent={cart.itemsCount} color='secondary'>
                <ShoppingCartIcon
                  fontSize='inherit'
                  sx={{ color: 'primary.contrastText' }}
                  onClick={() => handleNavigation('/shopping-cart')}
                />
              </Badge>
                :
              <ShoppingCartOutlinedIcon fontSize='inherit' sx={{ color: 'primary.contrastText' }} /> 
            }
          </IconButton>

          {user ?
            <Button sx={{ color: 'primary.contrastText', ml: 2 }} onClick={() => handleNavigation('/user')}>
              {user.firstName}
            </Button>
          :
            <Button sx={{ color: 'primary.contrastText', ml: 2 }} onClick={() => handleNavigation('/login')}>
              Login
            </Button>
          }
        </Box>

      </Container>
      <Container maxWidth='xl'>
        <Toolbar variant='dense'>
          <Box component={'nav'} sx={{ m: 0, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                size='large'
                sx={{ px: 2, color: 'primary.contrastText', display: 'block', border: '1px solid hsla(0, 0%, 100%, 0)',
                  '&:hover': { background: 'hsla(0, 0%, 100%, 0.2)', border: '1px solid hsla(0, 0%, 100%, 0.5)' }
                }}
                onClick={() => handleNavigation(page.path)}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;