// src/pages/Products.js
import React, { useState } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import products from '../data/products';
import '../css/Products.css';

const Products = ({ cart, setCart }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const addToCart = (product) => {
        const updatedCart = [...cart];
        const found = updatedCart.find(item => item.id === product.id);

        if (found) {
            found.quantity += 1;
        } else {
            updatedCart.push({ ...product, quantity: 1 });
        }

        setCart(updatedCart);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (e) => {
        setSortOption(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const sortedAndFilteredProducts = products
        .filter(product =>
            (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedCategory === '' || product.category === selectedCategory))
        .sort((a, b) => {
            if (sortOption === 'price-asc') return a.price - b.price;
            if (sortOption === 'price-desc') return b.price - a.price;
            if (sortOption === 'stock-asc') return a.stock - b.stock;
            if (sortOption === 'stock-desc') return b.stock - a.stock;
            return 0;
        });

    const uniqueCategories = [...new Set(products.map(product => product.category))];

    return (
        <div className="container">
            <h2 className="my-4">Products</h2>
            <Form className="row mb-3">
                <Form.Group controlId="search" className="col-md-4">
                    <Form.Control
                        type="text"
                        placeholder="Search products"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Form.Group>
                <Form.Group controlId="category" className="col-md-4">
                    <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        {uniqueCategories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="sort" className="col-md-4">
                    <Form.Control as="select" value={sortOption} onChange={handleSort}>
                        <option value="">Sort by</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="stock-asc">Stock: Low to High</option>
                        <option value="stock-desc">Stock: High to Low</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            <Row>
                {sortedAndFilteredProducts.map(product => (
                    <Col key={product.id} sm={12} md={6} lg={4}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    {product.description}
                                    <br />
                                    <strong>${product.price}</strong>
                                </Card.Text>
                                <Button variant="primary" onClick={() => addToCart(product)}>
                                    Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Products;
