// src/pages/Review.js
import React from 'react';
import { Button } from 'react-bootstrap';
import '../css/Checkout.css';

const Review = ({ cart, prevStep, placeOrder, formData }) => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div>
            <h3>Order Summary</h3>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.quantity} x ${item.price}
                    </li>
                ))}
            </ul>
            <h4>Total: ${total.toFixed(2)}</h4>
            <h3>Shipping Information</h3>
            <p>{formData.firstName} {formData.lastName}</p>
            <p>{formData.email}</p>
            <p>{formData.phone}</p>
            <p>{formData.address}</p>
            <p>{formData.city}, {formData.postalCode}</p>
            <Button variant="secondary" onClick={prevStep}>Back</Button>
            <Button variant="success" onClick={placeOrder}>Place Order</Button>
        </div>
    );
};

export default Review;
