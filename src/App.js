// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Cart from './pages/Cart';

function App() {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <Router>
            <div className="App">
                <Navbar cartCount={cart.length} />
                <Routes>
                    <Route path="/" element={<Products addToCart={addToCart} />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/cart" element={<Cart cart={cart} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
