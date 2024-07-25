// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';
import Navbar from './components/Navbar';
import ProductCatalog from './pages/Products';
import Orders from './pages/Orders';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/products" element={<ProductCatalog />} />
                    <Route path="/orders" element={<Orders />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
