import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from '../../api/axios';

const ManageInventory = () =>{
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('/products');
        setProducts(response.data);
    };

    return (
        <Container>
            <h1>Manage Inventory</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Stock</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.stock}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ManageInventory;
