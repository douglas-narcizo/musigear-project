import React, { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ProductsList from "../components/ProductsList/ProductsList";
import Typography from "@mui/material/Typography";

export default function Home() {
  const location = useLocation();
  const { category, products, setCategory } = useContext(ProductContext);
  const [prevCategory, setPrevCategory] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('category');
    const newCategory = query ? query : '';
    if (newCategory !== prevCategory) {
      setCategory(newCategory);
      setPrevCategory(newCategory);
    };
  }, [location.search, setCategory, prevCategory]);

  return (
    <Box>
      <Box style={{ 
        display: 'flex',
        alignItems: 'flex-end',
        height: 300,
        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.65)), url(/assets/images/guitars_wall_2b.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        marginBottom: '1rem' }}
      >
        <Container maxWidth='xl'>
          <Typography variant='h2' component='h1' fontWeight='400' sx={{ m: 1, textShadow: '0 0 6px black' }} color='primary.contrastText'>
            {category ? category : 'Products'}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth='xl'>
        <Typography variant='h5' fontWeight='500' sx={{ ml: 3, mb: 2 }}>Featured Products:</Typography>
        <ProductsList products={products} />
      </Container>
    </Box>
  );
}

/*
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('category');
    setCategory(query ? query : '');

    async function fetchData() {
      const data = await getProductsList(query ? query : '');
      setProdList(data);
    }
    fetchData();
    return () => {
      setProdList([]);
    };
  }, [location.search]);
*/