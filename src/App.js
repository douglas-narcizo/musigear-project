import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Home from './pages/Home';
import Login from './components/Login/Login';
import Register from './pages/Register';
import User from './pages/User';
import Product from './pages/Product';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import Complete from './pages/Complete';
import Navbar from "./components/Navbar/Navbar";
// import ResponsiveAppBar from "./components/ProductDetail/ProductDetail";

const stripePromise = loadStripe('pk_test_51QlI9yRgNuMY1fihqX5acVzEjnRKripdrBaolIcd1gSVQBigCCOd1sLmeQMuQ0XOTsSH2X7kPeRf6Yo4MM7CtO6y00IbUf45wX');

export default function App() {
  
  return (
    <Router className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/user' element={<User />} />
        <Route path='/products/:productId' element={<Product />} />
        <Route path='/shopping-cart' element={<ShoppingCart />} />
        <Route path='/checkout' element={<Checkout stripe={stripePromise} />} />
        <Route path='/order-complete' element={<Complete stripe={stripePromise} />} />
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
