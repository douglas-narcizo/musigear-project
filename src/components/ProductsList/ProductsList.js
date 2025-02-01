// import { addToCart } from '../../api/api';
import Carousel from '../Carousel/Carousel';
import ProductCard from '../ProductCard/ProductCard';
import Typography from '@mui/material/Typography';
import './ProductsList.css';
import Container from '@mui/material/Container';

const itemsToShow = Math.floor((window.innerWidth - 240) / 280);

/*
const addProduct = async (cartId, productId, qty = 1) => {
  await addToCart(cartId, productId, qty);
}
*/

export default function ProductsList (props) {
  const { products } = props;

  const productFeed = (list) => {
    const feed = [];
    for (const item of list) {
      feed.push(
        <ProductCard
          key={item.id}
          product={item}
        />
      )
    }
    return feed;
  }

// console.log(itemsToShow);
  return (
    <div>
      <Carousel itemsToShow={itemsToShow} >
        {productFeed(products)}
      </Carousel>
      <Typography variant='h5' sx={{ fontWeight: 'bold' }} >
        Products List:
      </Typography>
      <Container maxWidth='lg' className='products-list-container'>
        {productFeed(products)}
      </Container>
    </div>
  );
}
