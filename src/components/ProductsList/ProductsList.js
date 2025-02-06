import React, { useContext } from 'react';
import ProductContext from '../../context/ProductContext';
import Carousel from '../Carousel/Carousel';
import Container from '@mui/material/Container';
import ProductCard from '../ProductCard/ProductCard';
import Typography from '@mui/material/Typography';
import './ProductsList.css';
import { Box } from '@mui/material';


export default function ProductsList () {
  const itemsToShow = Math.floor((window.innerWidth - 240) / 280);
  const { products } = useContext(ProductContext);

  const productFeed = (list) => {
    return list.map((item) => (
      <ProductCard key={item.id} product={item} />
    ));
  };

  return (
    <div>
      <Carousel itemsToShow={itemsToShow}>
        {productFeed(products)}
      </Carousel>
      <Container maxWidth='xl' className='products-list-container'>
        <Typography variant='h5' sx={{width: '100%', fontWeight: 'bold' }} gutterBottom>
          Products List:
        </Typography>
        <Box className='products-list' sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          {productFeed(products)}
        </Box>
      </Container>
    </div>
  );
}
