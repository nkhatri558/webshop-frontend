// src/pages/PaymentForm.js
import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../css/Checkout.css';

const PaymentForm = ({ nextStep, prevStep, handleChange, formData }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <Form onSubmit={handleSubmit} className="payment-form">
            <Form.Group controlId="formCardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="formExpirationDate">
                        <Form.Label>Expiration Date</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="MM/YY"
                            name="expirationDate"
                            value={formData.expirationDate}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formCVC">
                        <Form.Label>CVC</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="CVC"
                            name="cvc"
                            value={formData.cvc}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="secondary" onClick={prevStep}>Back</Button>
            <Button variant="primary" type="submit">Next</Button>
        </Form>
    );
};

export default PaymentForm;
