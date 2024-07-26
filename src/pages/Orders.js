// src/pages/Orders.js
import React, { useState } from 'react';
import '../css/Orders.css';
import { Modal, Button } from 'react-bootstrap';

const orders = [
    { id: 1, date: '2023-07-21', status: 'Shipped', products: [{ name: 'Product 1', price: 29.99, quantity: 2 }] },
    { id: 2, date: '2023-07-22', status: 'Pending', products: [{ name: 'Product 2', price: 49.99, quantity: 1 }] },
    { id: 3, date: '2023-07-23', status: 'Delivered', products: [{ name: 'Product 3', price: 19.99, quantity: 4 }] },
];

const Orders = () => {
    const [show, setShow] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (order) => {
        setSelectedOrder(order);
        setShow(true);
    };

    return (
        <div className="container">
            <h2 className="my-4">Placed Orders</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.status}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleShow(order)}>
                                View
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedOrder && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Order Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Order ID: {selectedOrder.id}</h5>
                        <h6>Order Date: {selectedOrder.date}</h6>
                        <h6>Status: {selectedOrder.status}</h6>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedOrder.products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.quantity}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Orders;
