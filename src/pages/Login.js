import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from '../api/axios';

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
                    const user = {firstName: customer.firstName, email: customer.email, role: 'customer'};
                    console.log(user);
                    // login({ ...response.data, role: 'customer' });
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
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md="4">
                    <h2>Login</h2>
                    <Form>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleLogin}>
                            Login
                        </Button>
                        <Button variant="secondary" onClick={handleGuest} className="ml-2">
                            Join as Guest
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
