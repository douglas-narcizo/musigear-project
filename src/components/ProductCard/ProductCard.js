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
import Price from '../Price/Price';
import Rating from '@mui/material/Rating';
import './ProductCard.css';

function ProductCard (props) {
  const { product } = props;
  const { handleAddToCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <Box
      className='product-container'
      sx={{
        width: { xs: '48%', md: '17.5rem' },
        height: { xs: '33rem', md: '32rem' },
      }}
    >
      <Card
        className='product-wrapper'
        sx={{
          width: { xs: '97%', md: '16.5rem' },
          height: '96%',
          mx: '6px',
          position: 'relative'
        }}
      >
        <CardActionArea sx={{ height: { xs: '27.75rem', md: '27rem' } }} onClick={() => navigate(`/products/${product.id}`)}>
          <CardMedia
            component='img'
            sx={{ height: '16rem' /*, width: '100%'*/ }}
            image={product.preview}
            alt={`${product.name} preview image`}
            referrerPolicy='no-referrer'
          />

          {product.special && 
            <Typography variant='body2'
              sx={{
                fontWeight: 500,
                fontSize: '13px',
                px: 5, pb: '0.15rem', pt: 4, bgcolor: 'hsl(100 100% 60%)',
                position: 'absolute', top: 0, right: 0,
                transform: 'rotate(45deg) translate(21px, -48px)'
              }}
            >
              Deal!
            </Typography>
          }

          <CardHeader
            title={product.name}
            titleTypographyProps={{ fontSize: '1.2rem', lineHeight: 1.2, fontWeight: 500, letterSpacing: '-0.5px', gutterBottom: true }}
            subheader={`${product.description} This is a demonstration product, for portfolio purposes only!`}
//            subheaderTypographyProps={{ lineHeight: 1.2, height: 40, overflow: 'hidden' }}
            subheaderTypographyProps={{ title: `${product.description} (This is a demonstration product, for portfolio purposes only!)` }}
            sx={{ pt: 1, pb: 1, textAlign: 'left', borderTop: '2px solid', borderColor: 'primary.light' }}
          />
          <CardContent sx={{ pt: 0, pb: '0.5rem', textAlign: 'left' }}>

            <Rating name='product-rating' value={product.rating} precision={0.5} size='small' readOnly />

            <Price amount={product.price} sx={{ color: 'success.main' }} />

            <Typography variant='body2' sx={{ color: 'primary.light', position: 'absolute', bottom: '0.75rem', right: '1rem' }}>
              In stock: {product.stock}
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