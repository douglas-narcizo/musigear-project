import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login/Login';
import User from './components/User/User';
import Product from './pages/Product';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import Navbar from "./components/Navbar/Navbar";
// import ResponsiveAppBar from "./components/ProductDetail/ProductDetail";

export default function App() {
  
  return (
    <Router className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<User />} />
        <Route path='/products/:productId' element={<Product />} />
        <Route path='/shopping-cart' element={<ShoppingCart />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </Router>
  );
}

/*
    <div className="App">
      <header className="App-header">
        MusiGear
      </header>
      <main>
        Hello Baby!!
        <ProductsList products={testList}/>
      </main>
      <footer>
        Meu pé, meu querido pé
      </footer>
    </div>
*/
