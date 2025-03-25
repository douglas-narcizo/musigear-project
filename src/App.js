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
import Footer from "./components/Footer/Footer"; // Import the Footer component

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

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
      <Footer />
    </Router>
  );
}
