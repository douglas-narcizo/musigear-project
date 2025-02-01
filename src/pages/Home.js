import { getProductsList } from "../api/api";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ProductsList from "../components/ProductsList/ProductsList";
import { Typography } from "@mui/material";

const category = '';
const prodList = await getProductsList(category);

export default function Home() {
  return (
    <Box>
      <Box style={{ 
        display: 'flex',
        alignItems: 'flex-end',
        height: 300,
        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4)), url(/assets/images/guitars_wall_2b.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        marginBottom: '1rem' }}
      >
        {/*<Typography variant='h2' component='h1' sx={{ ml: 3 }} color='primary.contrastText'>Home Page</Typography>*/}
        <Container maxWidth='xl'>
          <Typography variant='h2' fontWeight='400' sx={{ m: 3, textShadow: '0 0 8px black' }} color='primary.contrastText'>
            {category && category.toUpperCase()}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth='xl'>
        <Typography variant='h5' fontWeight='500' sx={{ ml: 3, mb: 2 }}>Featured Products:</Typography>
        <ProductsList products={prodList} />
      </Container>
    </Box>
  );
}