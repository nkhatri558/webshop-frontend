// src/components/ProductDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import '../css/ProductDetail.css';
import { Button } from 'react-bootstrap';

const products = [
    { id: 1, name: 'Product 1', price: 29.99, stock: 10, category: 'Category 1', image: 'https://via.placeholder.com/150', description: 'Description for product 1' },
    { id: 2, name: 'Product 2', price: 49.99, stock: 5, category: 'Category 2', image: 'https://via.placeholder.com/150', description: 'Description for product 2' },
    { id: 3, name: 'Product 3', price: 19.99, stock: 15, category: 'Category 1', image: 'https://via.placeholder.com/150', description: 'Description for product 3' },
    { id: 4, name: 'Product 4', price: 99.99, stock: 3, category: 'Category 2', image: 'https://via.placeholder.com/150', description: 'Description for product 4' },
];

const ProductDetail = ({ addToCart }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={product.image} className="img-fluid" alt={product.name} />
                </div>
                <div className="col-md-6">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Stock: {product.stock}</p>
                    <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
