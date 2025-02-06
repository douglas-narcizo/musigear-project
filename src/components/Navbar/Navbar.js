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
import Typography from '@mui/material/Typography';
import './Navbar.css';

const categories = [
  {name:'All categories', path:'/'},
  {name:'Guitars', path:'/?category=Guitars'},
  {name:'Bass', path:'/?category=Bass'},
  {name:'Drums', path:'/?category=Drums'},
  {name:'Brass', path:'/?category=Brass'},
  {name:'Pro Audio', path:'/?category=Pro Audio'},
  {name:'Accessories', path:'/?category=Accessories'},
];

function Navbar() {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { category, setCategory } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleNavigation = (path, catName) => {
    setCategory(catName);
    navigate(path);
  }
  
  return (
    <AppBar
      position='sticky'
      sx={{
        background: 'linear-gradient(8deg,hsla(347, 65%, 43%, 1) 30%,hsla(21, 78%, 48%, 1) 90%)',
        borderBottom: '4px solid hsla(359, 90%, 65%, 1)',
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
          <Box component='nav' sx={{ m: 0, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {categories.map((cat) => (
              <Button
                key={cat.name}
                size='large'
                fontWeight='500'
                sx={{ px: 2, color: category === cat.name ? 'primary.contrastText' : 'hsla(0, 0%, 100%, 0.6)',
                  border: category === cat.name ? '1px solid hsla(0, 0%, 100%, 0.5)' : '1px solid hsla(0, 0%, 100%, 0)',
                  backgroundColor: category === cat.name ? '#a53749' : 'transparent',
                  '&:hover': { color: 'primary.contrastText', border: '1px solid hsla(0, 0%, 100%, 0.5)' }
                }}
                onClick={() => handleNavigation(cat.path)}
              >
                {cat.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;