// src/pages/Checkout.js
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';
import '../css/Checkout.css';
import axios from "../api/axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const Checkout = ({cart}) => {
    const [step, setStep] = useState(1);
    const initialCustomerState = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        postalCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    };
    const [formData, setFormData] = useState(initialCustomerState);
    const navigate = useNavigate();


    const clearCart = () => {
        cart.length = 0;
    }

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleChange = input => e => {
        setFormData({ ...formData, [input]: e.target.value });
    };

    const placeOrder = async () => {
        const order = {
            date: new Date().toISOString().split("T")[0],
            status: "Pending",
            customer: formData,
            items: cart.map(item => ({
                product: {
                    id: item.id,
                    name: item.name
                },
                quantity: item.quantity
            }))
        };
        console.log(order);
        // try {
        //     const response = await axios.post("/customers", formData);
        //     if (response.status === 201) {
        //         alert("Checkout successful!");
        //     }
        // } catch (error) {
        //     console.error("Error during checkout:", error);
        //     alert("Checkout failed.");
        // }

        try {
            const response = await axios.post("/orders", order);
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Order Placed',
                    text: 'Your order has been placed successfully!',
                }).then(() => {
                    clearCart();
                    setFormData(initialCustomerState);
                    navigate("/products");
                });
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Order placement failed.");
        }
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
