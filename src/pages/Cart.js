// src/pages/Cart.js
import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import '../css/Cart.css';

const Cart = ({ cart, setCart }) => {
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    return (
        <div className="container">
            <h2 className="my-4">Shopping Cart</h2>
            <ListGroup>
                {cart.map(item => (
                    <ListGroup.Item key={item.id}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5>{item.name}</h5>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${item.price}</p>
                            </div>
                            <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                                Remove
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default Cart;
