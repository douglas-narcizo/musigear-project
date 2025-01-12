import { getProductsList } from "../api/api";
import ProductsList from "../components/ProductsList/ProductsList";

const category = '';
const prodList = await getProductsList(category);

export default function Home() {
  return (
    <div className="App">
      <h1>Home Page</h1>
      <h2>Category: {category.toUpperCase()}</h2>
      <ProductsList products={prodList} />
    </div>
  );
}