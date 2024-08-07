import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import styled from 'styled-components';
import { Form, Button, Card } from 'react-bootstrap';

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const StyledCard = styled(Card)`
  padding: 20px;
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

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
        <LoginWrapper>
            <StyledCard>
                <Card.Body>
                    <Card.Title className="text-center">Login</Card.Title>
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
                        <Button variant="primary" onClick={handleLogin} block>
                            Login
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={handleGuest}
                            block
                            className="mt-2"
                        >
                            Join as Guest
                        </Button>
                    </Form>
                </Card.Body>
            </StyledCard>
        </LoginWrapper>
    );
};

export default Login;
