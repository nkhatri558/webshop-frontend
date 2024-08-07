import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import {Form, Button, Card, Container, Row, Col} from 'react-bootstrap';
import '../css/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (email === 'admin@gmail.com') {
            const user = {email: email, role: 'admin'};
            sessionStorage.setItem("user", JSON.stringify(user));
            navigate('/admin');
        } else {
            try {
                const response = await axios.post(`/customers/email/${email}`);
                console.log(`Customer Data: ${response.data}`);
                if (response.data) {
                    const customer = response.data;
                    const user = {id: customer.id, firstName: customer.firstName, email: customer.email, role: 'customer'};
                    sessionStorage.setItem("user", JSON.stringify(user));
                    navigate('/customer');
                } else {
                    alert('User does not exist. Joining as guest.');
                    navigate('/guest');
                }
            } catch (error) {
                alert('Error occurred while checking user');
            }
        }
    };

    const handleGuest = () => {
        navigate('/guest');
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="login-card">
                        <Card.Body>
                            <h2 className="text-center mb-4">Login</h2>
                            <Form>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={handleLogin}
                                        className="w-100"
                                        block>
                                    Login
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={handleGuest}
                                    block
                                    className="mt-2 w-100"
                                >
                                    Join as Guest
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
