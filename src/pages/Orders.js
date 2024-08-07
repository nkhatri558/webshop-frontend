// src/pages/Orders.js
import React, { useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import { Button, Container, Modal } from 'react-bootstrap';
import '../css/Orders.css';
import axios from '../api/axios';

const Orders = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios
                .get(`/orders/customer?email=${user.email}`)
                .then(response => {
                    console.log(response.data);
                    setOrders(response.data)
                });
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        fetchOrders();
    });
    const [viewingOrder, setViewingOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const columns = [
        { name: 'Order ID', selector: row => row.id, sortable: true },
        { name: 'Order Date', selector: row => row.date, sortable: true },
        { name: 'Status', selector: row => row.status, sortable: true },
        {
            name: 'Actions',
            cell: row => (
                <Button variant="primary" onClick={() => viewOrder(row)}>
                    View
                </Button>
            )
        }
    ];

    const viewOrder = order => {
        setViewingOrder(order);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setViewingOrder(null);
    };

    return (
        <Container>
            <h2 className="my-4">Orders</h2>
            <DataTable
                columns={columns}
                data={orders}
                pagination
                highlightOnHover
                selectableRows
            />
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {viewingOrder && (
                        <div>
                            <p><strong>Order ID:</strong> {viewingOrder.id}</p>
                            <p><strong>Order Date:</strong> {viewingOrder.date}</p>
                            <p><strong>Status:</strong> {viewingOrder.status}</p>
                            <h5>Items</h5>
                            <ul>
                                {viewingOrder.items.map((item, index) => (
                                    <li key={index}>
                                        {item.name} - ${item.price} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Orders;
