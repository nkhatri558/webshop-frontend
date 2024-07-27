// src/components/ProductDetail.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../css/ProductDetail.css';

const ProductDetail = ({ product, show, handleClose }) => (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
);

export default ProductDetail;
