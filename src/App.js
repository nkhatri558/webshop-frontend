// src/App.js
import React, { useState } from 'react';
import AppRoutes from './routes/Routes';
import './css/App.css';

function App() {
    const [cart, setCart] = useState([]);
    const addToCart = (product) => {
        setCart([...cart, product]);
    };
    return (
        <div className="App">
            <AppRoutes cart={cart} addToCart={addToCart} />
        </div>
    );
}

export default App;
