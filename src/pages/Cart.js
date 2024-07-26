// src/pages/Cart.js
import React from 'react';
import '../css/Cart.css';
import { Table } from 'react-bootstrap';

const Cart = ({ cart }) => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="container">
            <h2 className="my-4">Shopping Cart</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {cart.map((product, index) => (
                    <tr key={index}>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <h4>Total: ${total.toFixed(2)}</h4>
        </div>
    );
};

export default Cart;
