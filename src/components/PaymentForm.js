// src/pages/PaymentForm.js
import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../css/Checkout.css';

const PaymentForm = ({ nextStep, prevStep, handleChange, values }) => {
    const Continue = e => {
        e.preventDefault();
        nextStep();
    };

    const Back = e => {
        e.preventDefault();
        prevStep();
    };

    return (
        <Container>
            <h2 className="my-4">Payment Information</h2>
            <Form onSubmit={Continue}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="cardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Card Number"
                                onChange={handleChange('cardNumber')}
                                defaultValue={values.cardNumber}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="expiryDate">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="MM/YY"
                                onChange={handleChange('expiryDate')}
                                defaultValue={values.expiryDate}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="cvv">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="CVV"
                                onChange={handleChange('cvv')}
                                defaultValue={values.cvv}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="secondary" onClick={Back} className="mt-3">
                    Back
                </Button>
                <Button variant="primary" type="submit" className="mt-3 ml-2">
                    Next
                </Button>
            </Form>
        </Container>
    );
};

export default PaymentForm;
