import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import ProductContext from '../../context/ProductContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { categories } from '../../context/categories';
import './Navbar.css';

function Navbar() {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { category } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  }
  
  return (
    <AppBar
      position='sticky'
      sx={{
        background: 'linear-gradient(8deg,hsla(347, 65%, 43%, 1) 30%,hsla(21, 78%, 48%, 1) 90%)',
        borderBottom: '4px solid hsla(359, 90%, 65%, 1)', // hsla(338, 52%, 43%, 1)',
      }}
    >
      <Container maxWidth='xl' sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* ----- APP LOGO ----- */}
        <Box sx={{ ml: { xs: 1, md: 4 }, mt: { xs: 1, md: 2 }, width: {xs: '12rem', md: '15rem'} }}>
          <img
            src="/assets/images/MusiGear_logo.svg"
            alt="MusiGear Logo"
            style={{ width: '100%', cursor: 'pointer' }}
            onClick={() => handleNavigation('/')}
          />
        </Box>

        {/* ----- LOGIN / USER ----- */}
        <Box sx={{ mr: { sm: 1, md: 4 }, mt: { sm: 1, md: 2 }, flexGrow: 1, textAlign: 'right' }}>
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
            <Button sx={{ color: 'primary.contrastText', ml: { xs: 0, md: 1 } }} onClick={() => handleNavigation('/user')}>
              <Avatar
                alt={`${user.firstName} ${user.lastName}`} 
                src={user.picture}
                sx={{ mr: 1.5, height: '2rem', width: '2rem', border: 0.5, bgcolor: 'grey.300' }}
              />
              {user.firstName}
            </Button>
          :
            <Button sx={{ color: 'primary.contrastText', ml: 1 }} onClick={() => handleNavigation('/login')}>
              Login
            </Button>
          }
        </Box>
      </Container>

      {/* ----- NAV BUTTONS BAR (wide) ----- */}
      <Container maxWidth='xl' sx={{ display: { xs: 'none', sm: 'flex' }, overflow: 'auto' }}>
        <Toolbar variant='dense' sx={{ m: 0 }}>
          <Box component='nav' sx={{ m: 0, display: 'flex', overflow: 'auto' }}>
            {categories.map((cat) => (
              <Button
                key={cat.title}
                size='large'
                fontWeight='500'
                sx={{ px: 2, color: category === cat.name ? 'primary.contrastText' : 'hsla(0, 0%, 100%, 0.6)',
                  textWrap: 'nowrap',
                  border: category === cat.name ? '1px solid hsla(0, 0%, 100%, 0.5)' : '1px solid hsla(0, 0%, 100%, 0)',
                  backgroundColor: category === cat.name ? '#a53749' : 'transparent',
                  '&:hover': { color: 'primary.contrastText', border: '1px solid hsla(0, 0%, 100%, 0.5)' }
                }}
                onClick={() => handleNavigation(cat.path)}
              >
                {cat.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>

      {/* ----- NAV BUTTONS BAR (narrow) ----- */}
      <Container sx={{ display: { xs: 'flex', sm: 'none' }, overflowX: 'auto' }}>
        <Toolbar variant='dense' sx={{ minHeight: '1.8rem' }}>
          <Box component='nav' sx={{ display: 'flex', overflow: 'auto' }}>
            {categories.map((cat) => (
              <Button
                key={cat.title}
                size='small'
                fontWeight='500'
                sx={{ p: '0.2rem', color: category === cat.name ? 'primary.contrastText' : 'hsla(0, 0%, 100%, 0.6)',
                  textWrap: 'nowrap',
                  border: category === cat.name ? '1px solid hsla(0, 0%, 100%, 0.5)' : '1px solid hsla(0, 0%, 100%, 0)',
                  borderRadius: '0.35rem',
                  backgroundColor: category === cat.name ? '#a53749' : 'transparent',
                  '&:hover': { color: 'primary.contrastText', border: '1px solid hsla(0, 0%, 100%, 0.5)' }
                }}
                onClick={() => handleNavigation(cat.path)}
              >
                {cat.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>

    </AppBar>
  );
}

export default Navbar;