// src/pages/Checkout.js
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';
import '../css/Checkout.css';

const Checkout = ({cart}) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleChange = input => e => {
        setFormData({ ...formData, [input]: e.target.value });
    };

    const placeOrder = () => {
        alert('Order placed successfully!');
        // Add logic to handle order placement
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <AddressForm nextStep={nextStep} handleChange={handleChange} values={formData} />;
            case 2:
                return <PaymentForm nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={formData} />;
            case 3:
                return <Review cart={cart} prevStep={prevStep} values={formData} placeOrder={placeOrder} />;
            default:
                return <AddressForm nextStep={nextStep} handleChange={handleChange} values={formData} />;
        }
    };

    return (
        <Container>
            <h2 className="my-4">Checkout</h2>
            {renderStep()}
        </Container>
    );
};

export default Checkout;
