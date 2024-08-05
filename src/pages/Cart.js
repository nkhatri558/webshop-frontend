// src/pages/Cart.js
import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';

const Cart = ({ cart, setCart }) => {
    const navigate = useNavigate();

    const handleRemove = (index) => {
        const newCart = cart.filter((item, i) => i !== index);
        setCart(newCart);
    };

    const handleCheckout = () => {
        navigate('/customer/checkout');
    };

    return (
        <Container>
            <h2 className="my-4">Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cart.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>1</td>
                                <td>${item.price}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleRemove(index)}>
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Button variant="primary" onClick={handleCheckout}>
                        Proceed to Checkout
                    </Button>
                </>
            )}
        </Container>
    );
};

export default Cart;
