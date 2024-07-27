// src/routes/Routes.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Products from '../pages/Products';
import Orders from '../pages/Orders';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';

const AppRoutes = () => {
    const [cart, setCart] = useState([]);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Products cart={cart} setCart={setCart} />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
                <Route path="/checkout" element={<Checkout cart={cart} />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
