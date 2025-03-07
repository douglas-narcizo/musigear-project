import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Price from '../Price/Price';
import { Rating } from '@mui/material';

export default function ProductDetail (props) {
  const { product } = props;
  const { handleAddToCart } = useContext(CartContext);
  
  return (
    <Container sx={{ height: '70vh' }} className='product-container'>
      <Card sx={{ height: '98%', position: 'relative' }} className='product-wrapper'>
        <CardMedia
          component='img'
          height='65%'
          width='100%'
          image={product.preview}
          alt={`${product.name} preview image`}
          referrerPolicy='no-referrer'
        />
        {product.special && 
          <Typography variant='body1'
            sx={{
              fontWeight: 500,
              fontSize: '18px',
              px: 5, pb: '0.15rem', pt: 4, bgcolor: 'hsl(100 100% 60%)', // borderBottomLeftRadius: '6px',
              position: 'absolute', top: 0, right: 0,
              transform: 'rotate(45deg) translate(21px, -42px)'
            }}
          >
            Deal!
          </Typography>
        }
        <Typography variant='h6' sx={{ fontSize: 14, bgcolor: 'primary.main', color: 'primary.contrastText', textAlign: 'center' }}>
          PRODUCT {product.id.slice(0, 3)} – {product.category.toUpperCase()}
        </Typography>
        <CardHeader
          title={product.name}
          titleTypographyProps={{ fontWeight: 500 }}
          subheader={product.description}
          subheaderTypographyProps={{ lineHeight: 1.3 }} // , height: 38, overflow: 'hidden'
          sx={{ pt: 1, pb: { xs: 1, sm: 2 }, textAlign: 'left' }}
        />
        <CardContent sx={{ pt: 0, textAlign: 'left' }}>
          <Typography variant='body2' sx={{ color: 'primary.main', fontWeight: 500, position: 'absolute', top: '70%', right: '1rem' }}>
            In stock: {product.stock}
          </Typography>

          <Rating name='product-rating' value={product.rating} precision={0.5} readOnly />

          <Price amount={product.price} sx={{ color: 'success.main', transform: 'translate(13%) scale(1.25)' }} />
          <Button
            variant='contained'
            sx={{ width: 0.4, height: 'fit-content', display: 'block', margin: '0 auto', mt: { xs: 0, sm: 3 } }}
            onClick={() => handleAddToCart(product.id)}
          >
            BUY
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
