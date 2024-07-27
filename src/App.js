// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/App.css';
import Navbar from './components/Navbar';
import AppRoutes from './routes/Routes';

function App() {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <Router>
            <div className="App">
                <Navbar cartCount={cart.length} />
                <AppRoutes cart={cart} addToCart={addToCart} />
            </div>
        </Router>
    );
}

export default App;
