import React, { useContext } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductContext from '../../context/ProductContext';
import Carousel from '../Carousel/Carousel';
import ProductCard from '../ProductCard/ProductCard';
import './ProductsList.css';


export default function ProductsList () {
  const carouselItemsToShow = Math.floor((window.innerWidth - 240) / 280);
  const { products, category } = useContext(ProductContext);

  const productDeals = (list) => {
    return list.map((item) => (
      item.special && (item.category === category || !category) &&
      <ProductCard key={item.id} product={item} />
    ));
  };

  const productsRegular = (list) => {
    return list.map((item) => (
      !item.special && (item.category === category || !category) &&
      <ProductCard key={item.id} product={item} />
    ));
  };

  const productFeed = (list) => {
    return list.map((item) => (
      <ProductCard key={item.id} product={item} />
    ));
  };

  return (
    <Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Typography
          variant='h6' component='h3' fontWeight='500'
          sx={{ px: 6, py: '2px', my: 2, bgcolor: 'hsl(48 100% 63%)', borderBottom: 1, borderTop: 1 }}
        >
          Today's deals{category ? ` on ${category.toUpperCase()}:` : ':' } 
        </Typography>
        <Carousel carouselItemsToShow={carouselItemsToShow}>
          {productDeals(products)}
        </Carousel>
      </Box>
      <Container maxWidth='xl' sx={{ px: { xs: 0, md: 1 } }} className='products-list-container'>
        <Typography
          variant='h6' component='h3' fontWeight='500'
          sx={{ pl: 3, pb: 1, mb: 1, width: '100%', fontWeight: 'bold', borderBottom: 1, display: { xs: 'block', md: 'none' } }}
          gutterBottom
        >
          { category ? `Products in '${category}' category:` : 'What are you looking for today?' }
        </Typography>
        <Typography
          variant='h6' component='h3' fontWeight='500'
          sx={{ pl: 3, pb: 1, mb: 1, width: '100%', fontWeight: 'bold', borderBottom: 1, display: { xs: 'none', md: 'block' } }}
          gutterBottom
        >
          See also:
        </Typography>
        <Box className='products-list' sx={{ display: { xs: 'flex', md: 'none' }, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          {productFeed(products)}
        </Box>
        <Box className='products-list' sx={{ display: { xs: 'none', md: 'flex' }, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          {productsRegular(products)}
        </Box>
      </Container>
    </Box>
  );
}
