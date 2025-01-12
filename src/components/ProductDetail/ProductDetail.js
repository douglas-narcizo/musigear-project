import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  trailingZeroDisplay: 'stripIfInteger',
});

export default function ProductDetail (props) {
  const { product } = props;
  
  return (
    <Box sx={{ minWidth: 280, height: '70vh' }} className='product-container'>
      <Card sx={{ height: '98%', position: 'relative' }} className='product-wrapper'>
        <CardMedia
          component='img'
          height='65%'
          width='100%'
          image={product.preview}
          alt={`${product.name} preview image`}
        />
        <Typography variant='h6' sx={{ fontSize: 14, bgcolor: 'primary.main', color: 'primary.contrastText', textAlign: 'center' }}>
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
          <Typography variant='body2' sx={{ color: 'primary.main', fontWeight: 500, position: 'absolute', top: '70%', right: '1rem' }}>
            Stock: {product.stock}
          </Typography>
          <Typography variant='h5' sx={{ color: 'warning.dark', fontWeight: 500 }}>
            {currency.format(product.price)}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            sx={{ width: 0.4 }}
            onClick={() => {}}
          >
            BUY
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
