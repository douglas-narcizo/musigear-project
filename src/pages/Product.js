// import { useEffect, useContext } from "react";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { getProduct } from "../api/api";
import ProductContext from "../context/ProductContext";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import Button from "@mui/material/Button";

export default function Product() {
  const { productId } = useParams();
//  const { products, setProducts } = useContext(ProductContext);
  const { products } = useContext(ProductContext);
  const productDetails = products.find(product => product.id === productId);
  const navigate = useNavigate();

/*
useEffect(() => {
  const fetchProduct = async () => {
    if (!productDetails) {
      const data = await getProduct(productId);
      setProducts(prevProducts => [...prevProducts, data]);
    }
  };

  fetchProduct();
}, [productId, productDetails, setProducts]);
*/  

  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Button sx={{ pr: 2 }} onClick={() => navigate(-1)}>&lt; Back</Button>
      <Typography variant='h3' component='h1' sx={{ my: 2 }}>
        Product Detail
      </Typography>
      {productDetails ? (
        <ProductDetail
          key={productDetails.id}
          product={productDetails} 
        />
      ) : (
        <Typography variant='body1'>
          Loading...
        </Typography>
      )}
    </Container>
  );
}