import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AdminDashboard = () => {
    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Welcome to the Admin Dashboard</Card.Title>
                            <Card.Text>
                                Use the navigation bar to manage products, orders, and inventory.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Manage Products</Card.Title>
                            <Card.Text>
                                Add, update, delete, and view products.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Manage Orders</Card.Title>
                            <Card.Text>
                                Update and delete orders.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Manage Inventory</Card.Title>
                            <Card.Text>
                                Notify when stock is low.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminDashboard;
