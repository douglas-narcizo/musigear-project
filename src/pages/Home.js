import React, { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ProductsList from "../components/ProductsList/ProductsList";
import Typography from "@mui/material/Typography";
import { categories } from "../context/categories";

export default function Home() {
  const location = useLocation();
  const { category, setCategory } = useContext(ProductContext);
  const [h1FontSize, setH1FontSize] = useState('6rem');
  const [h1LetterSpacing, setH1LetterSpacing] = useState('1rem');

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('category');
    const newCategory = query ? query : '';
    if (newCategory !== category) {
      setCategory(newCategory);
      const textLengthFactor = 3 + (11 - (newCategory ? newCategory : 'PRODUCTS').length) / 3.5;
      const textSpacingFactor = (11 - (newCategory ? newCategory : 'PRODUCTS').length) / 7;
      const newFontSize = `calc(3rem + ${textLengthFactor}vw)`;
      const newLetterSpacing = `calc(5vw*${textSpacingFactor})`;
      setH1FontSize(newFontSize);
      setH1LetterSpacing(newLetterSpacing);
    }
  }, [location.search, setCategory, category]);

  const categoryMap = () => {
    if (category) {
      return categories.filter(cat => cat.name === category)[0]
    } else {
      return categories[0];
    }
  };

  return (
    <Box>
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        height: { xs: '14rem', sm: '17rem' },
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4)), url(${categoryMap().banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat' }}
      >
        <Container maxWidth='xl'>
          <Typography
            variant='h1' fontSize={h1FontSize} fontWeight='400'
            color='primary.contrastText'
            sx={{ m: 1, textShadow: '0 0 30px rgba(0, 0, 0, 0.87)', textAlign: 'center', letterSpacing: h1LetterSpacing }}
          >
            {category ? category.toUpperCase() : ''}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth='xl' sx={{ px: { xs: 0, sm: 1 } }} >
        <ProductsList />
      </Container>
    </Box>
  );
}
