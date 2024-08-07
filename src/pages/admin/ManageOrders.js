import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import {Table, Button, Modal, Form, Pagination, Row, Col} from 'react-bootstrap';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const [formData, setFormData] = useState({
        date: '',
        status: '',
        customer: {
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
        },
        items: []
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios
                .get('/orders').then(response => {
                    console.log(response.data);
                    setOrders(response.data);
                });
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredOrders = orders.filter(order =>
        order.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const handleShow = (order) => {
        setEditingOrder(order);
        setFormData({
            date: order.date,
            status: order.status,
            customer: { ...order.customer },
            items: order.items
        });
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setEditingOrder(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('customer.')) {
            const customerField = name.split('.')[1];
            setFormData(prevFormData => ({
                ...prevFormData,
                customer: {
                    ...prevFormData.customer,
                    [customerField]: value
                }
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/orders/${editingOrder.id}`, formData);
            fetchOrders();
            handleClose();
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    return (
        <div>
            <Row className="mb-3">
                <Col md={4} className="ms-auto">
                    <Form.Control
                        type="text"
                        placeholder="Search Orders"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Col>
            </Row>
            <Table striped bordered hover className="mt-4">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentOrders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.status}</td>
                        <td>{order.customer.firstName} {order.customer.lastName}</td>
                        <td>
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.id}>
                                        {item.name} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <Button variant="warning" onClick={() => handleShow(order)}>Edit</Button>{' '}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Pagination>
                {[...Array(Math.ceil(filteredOrders.length / ordersPerPage)).keys()].map(number => (
                    <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}>
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Shipped">Shipped</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="customer.firstName">
                            <Form.Label>Customer First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="customer.firstName"
                                value={formData.customer.firstName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="customer.lastName">
                            <Form.Label>Customer Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="customer.lastName"
                                value={formData.customer.lastName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="customer.email">
                            <Form.Label>Customer Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="customer.email"
                                value={formData.customer.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="customer.phone">
                            <Form.Label>Customer Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="customer.phone"
                                value={formData.customer.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="customer.address1">
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control
                                type="text"
                                name="customer.address1"
                                value={formData.customer.address1}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="customer.address2">
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control
                                type="text"
                                name="customer.address2"
                                value={formData.customer.address2}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="customer.city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="customer.city"
                                value={formData.customer.city}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="customer.postalCode">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="customer.postalCode"
                                value={formData.customer.postalCode}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ManageOrders;
