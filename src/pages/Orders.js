// src/components/Orders.js
import React from 'react';
import '../css/Orders.css';

const orders = [
    { id: 1, product: 'Product 1', quantity: 2 },
    { id: 2, product: 'Product 2', quantity: 1 },
    { id: 3, product: 'Product 3', quantity: 4 },
];

const Orders = () => {
    return (
        <div className="container">
            <h2 className="my-4">Placed Orders</h2>
            <ul className="list-group">
                {orders.map(order => (
                    <li key={order.id} className="list-group-item">
                        {order.product} - Quantity: {order.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;
