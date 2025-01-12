import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/api";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ProductDetail from "../components/ProductDetail/ProductDetail";

export default function Product() {
  const { productId } = useParams();
  const [ productDetails, setProductDetails ] = useState(null);

  const fetchData = useCallback(
    async () => {
      const data = await getProduct(productId);
      setProductDetails(data);
    }
  ,[productId]);

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Typography variant='h3' component='h1'>
        Product Detail
      </Typography>
      <Typography variant='h5' component='h2'>
        Details for product:
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