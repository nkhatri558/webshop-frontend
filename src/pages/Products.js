// src/components/Products.js
import React from 'react';
import ProductCard from '../components/ProductCard';
import '../css/Products.css';

const products = [
    { id: 1, name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 49.99, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 19.99, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product 4', price: 99.99, image: 'https://via.placeholder.com/150' },
];

const Products = () => {
    return (
        <div className="container">
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-3">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
