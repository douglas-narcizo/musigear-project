import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { currency } from '../../util/util';
// import './ProductCard.css';

function ProductCard (props) {
  const { product } = props;
  const { handleAddToCart } = useContext(CartContext);
//  const { handleAddToCart, handleRemoveFromCart } = useContext(CartContext);
//  href={`/products/${product.id}`}
  const navigate = useNavigate();

  return (
    <Box sx={{ minWidth: 280, height: '30rem' }} className='product-container'>
      <Card sx={{ height: '98%', mr: '1rem', position: 'relative' }} className='product-wrapper'>
        <CardActionArea onClick={() => navigate(`/products/${product.id}`)}>
          <CardMedia
            component='img'
            height='250'
            width='100%'
            image={product.preview}
            alt={`${product.name} preview image`}
          />
          <Typography variant='h6' sx={{ fontSize: 14, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
            PRODUCT {product.id.slice(0, 3)} – {product.category.toUpperCase()}
          </Typography>
          <CardHeader
            title={product.name}
            titleTypographyProps={{ fontWeight: 500 }}
            subheader={product.description}
            subheaderTypographyProps={{ lineHeight: 1.3, height: 38, overflow: 'hidden' }}
            sx={{ pt: 1, pb: 1, textAlign: 'left' }}
          />
          <CardContent sx={{ pt: 0, textAlign: 'left' }}>
            <Typography variant='body2' sx={{ color: 'primary.main', fontWeight: 500, position: 'absolute', top: 283, right: '1rem' }}>
              Stock: {product.stock}
            </Typography>
            <Typography variant='h5' sx={{ color: 'warning.dark', fontWeight: 500 }}>
              {currency.format(product.price)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            sx={{ width: 0.4, textAlign: 'center' }}
            onClick={() => handleAddToCart(product.id)}
          >
            BUY
          </Button>
          {/*
          <Button
            variant='outlined'
            sx={{ width: 0.4, textAlign: 'center', mt: 1 }}
            onClick={() => handleRemoveFromCart(product.id)}
          >
            REMOVE
          </Button>
          */}
        </CardActions>
      </Card>
    </Box>
  );
}

export default ProductCard;

/*
  return (
    <div className="product-container">
      <div className="product-wrapper">
      <div className="product-preview">
        <img src={product.preview} alt='Product preview' />
      </div>
      <div className="product-details">
        <h4 className="product-id">PRODUCT {product.id.slice(0, 6)} – {product.category.toUpperCase()}</h4>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
      <h3 className="product-price">Price: $ {product.price}</h3>
      <button className="Buy-button">BUY</button>
      </div>
    </div>
  );
*/