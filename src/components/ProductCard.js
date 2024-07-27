// src/components/ProductCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../css/ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
    return (
        <Card className="product-card">
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>${product.price}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
