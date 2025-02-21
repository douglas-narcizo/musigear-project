import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/api";
import ProductContext from "../context/ProductContext";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ProductDetail from "../components/ProductDetail/ProductDetail";

export default function Product() {
  const { productId } = useParams();
  const { products, setProducts } = useContext(ProductContext);
  const productDetails = products.find(product => product.id === productId);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productDetails) {
        const data = await getProduct(productId);
        setProducts(prevProducts => [...prevProducts, data]);
      }
    };

    fetchProduct();
  }, [productId, productDetails, setProducts]);

  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Typography variant='h3' component='h1'>
        Product Detail
      </Typography>
      <Typography variant='h5' component='h2' sx={{ mb: 2 }}>
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