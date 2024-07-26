// src/components/ProductCard.js
import React from 'react';
import '../css/ProductCard.css';
import { Button } from 'react-bootstrap';

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="card">
            <img src={product.image} className="card-img-top" alt={product.name} />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
                <p className="card-text">Stock: {product.stock}</p>
                <Button variant="primary" onClick={() => addToCart(product)}>
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
