// src/components/ProductCard.js
import React from 'react';
import '../css/ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="card product-card">
            <img src={product.image} className="card-img-top" alt={product.name} />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
