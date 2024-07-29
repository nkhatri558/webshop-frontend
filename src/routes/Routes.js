// src/routes/Routes.js
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from '../components/Navbar';
import Products from '../pages/Products';
import Orders from '../pages/Orders';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';

const AppRoutes = () => {
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    return (
        <Router>
            <NavigationBar/>
            <Routes>
                <Route path="/" element={<Products cart={cart} setCart={setCart} cartCount={cartCount} setCartCount={setCartCount}/>}/>
                <Route path="/products" element={<Products cart={cart} setCart={setCart} cartCount={cartCount} setCartCount={setCartCount}/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}/>
                <Route path="/checkout" element={<Checkout cart={cart}/>}/>
                <Route path="/payment" element={<PaymentForm/>}/>
                <Route path="/review" element={<Review cart={cart}/>}/>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
