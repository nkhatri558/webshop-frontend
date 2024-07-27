// src/components/AddressForm.js
import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../css/Checkout.css';

const AddressForm = ({ nextStep, handleChange, values }) => {
    const Continue = e => {
        e.preventDefault();
        nextStep();
    };

    return (
        <Container>
            <h2 className="my-4">Shipping Address</h2>
            <Form onSubmit={Continue}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="First Name"
                                onChange={handleChange('firstName')}
                                defaultValue={values.firstName}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                                onChange={handleChange('lastName')}
                                defaultValue={values.lastName}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                onChange={handleChange('email')}
                                defaultValue={values.email}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Phone"
                                onChange={handleChange('phone')}
                                defaultValue={values.phone}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="address1">
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Address Line 1"
                                onChange={handleChange('address1')}
                                defaultValue={values.address1}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="address2">
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Address Line 2"
                                onChange={handleChange('address2')}
                                defaultValue={values.address2}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="City"
                                onChange={handleChange('city')}
                                defaultValue={values.city}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="zip">
                            <Form.Label>Zip / Postal Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Zip / Postal Code"
                                onChange={handleChange('zip')}
                                defaultValue={values.zip}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" className="mt-3">
                    Next
                </Button>
            </Form>
        </Container>
    );
};

export default AddressForm;
