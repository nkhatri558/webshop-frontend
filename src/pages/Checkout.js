// src/pages/Checkout.js
import React, { useState } from 'react';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import '../css/Checkout.css';

const Checkout = ({ cart }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        cardNumber: '',
        expirationDate: '',
        cvc: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const placeOrder = () => {
        alert('Order placed successfully!');
        // Add logic to handle order placement
    };

    return (
        <div className="container">
            <h2 className="my-4">Checkout</h2>
            {step === 1 && <AddressForm nextStep={nextStep} handleChange={handleChange} formData={formData} />}
            {step === 2 && <PaymentForm nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
            {step === 3 && <Review cart={cart} prevStep={prevStep} placeOrder={placeOrder} formData={formData} />}
        </div>
    );
};

export default Checkout;
