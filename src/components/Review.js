// src/pages/Review.js
import React from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
import '../css/Checkout.css';

const Review = ({ cart, values, prevStep, placeOrder }) => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const Back = e => {
        e.preventDefault();
        prevStep();
    };

    const PlaceOrder = e => {
        e.preventDefault();
        placeOrder();
    };

    return (
        <Container>
            <h2 className="my-4">Order Review</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.quantity} x ${item.price}
                    </li>
                ))}
            </ul>
            <h4>Total: ${total.toFixed(2)}</h4>
            <h3>Shipping Information</h3>
            <ListGroup>
                <ListGroup.Item><strong>First Name:</strong> {values.firstName}</ListGroup.Item>
                <ListGroup.Item><strong>Last Name:</strong> {values.lastName}</ListGroup.Item>
                <ListGroup.Item><strong>Email:</strong> {values.email}</ListGroup.Item>
                <ListGroup.Item><strong>Phone:</strong> {values.phone}</ListGroup.Item>
                <ListGroup.Item><strong>Address Line 1:</strong> {values.address1}</ListGroup.Item>
                <ListGroup.Item><strong>Address Line 2:</strong> {values.address2}</ListGroup.Item>
                <ListGroup.Item><strong>City:</strong> {values.city}</ListGroup.Item>
                <ListGroup.Item><strong>Zip / Postal Code:</strong> {values.zip}</ListGroup.Item>
                <ListGroup.Item><strong>Card Number:</strong> {values.cardNumber}</ListGroup.Item>
                <ListGroup.Item><strong>Expiry Date:</strong> {values.expiryDate}</ListGroup.Item>
                <ListGroup.Item><strong>CVV:</strong> {values.cvv}</ListGroup.Item>
            </ListGroup>
            <Button variant="secondary" onClick={Back} className="mt-3">
                Back
            </Button>
            <Button variant="primary" onClick={PlaceOrder} className="mt-3">
                Place Order
            </Button>
        </Container>
    );
};

export default Review;
