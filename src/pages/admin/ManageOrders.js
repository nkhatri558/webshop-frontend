import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await axios.get('/api/admin/orders');
        setOrders(response.data);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = async (e) => {
        e.preventDefault();
        const updatedOrder = { ...currentOrder, status: e.target.status.value };
        await axios.put(`/api/admin/orders/${currentOrder.id}`, updatedOrder);
        fetchOrders();
        handleClose();
    };

    const handleEdit = (order) => {
        setCurrentOrder(order);
        handleShow();
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/admin/orders/${id}`);
        fetchOrders();
    };

    return (
        <Container>
            <h1>Manage Orders</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Customer</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.status}</td>
                        <td>{order.customer.firstName} {order.customer.lastName}</td>
                        <td>
                            <Button variant="warning" onClick={() => handleEdit(order)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDelete(order.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Order</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSave}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" name="status" defaultValue={currentOrder ? currentOrder.status : ''} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
}

export default ManageOrders;
