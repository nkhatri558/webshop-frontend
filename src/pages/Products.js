// src/pages/Products.js
import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../css/Products.css';

const products = [
    { id: 1, name: 'Product 1', price: 29.99, stock: 10, category: 'Category 1', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 49.99, stock: 5, category: 'Category 2', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 19.99, stock: 15, category: 'Category 1', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product 4', price: 99.99, stock: 3, category: 'Category 2', image: 'https://via.placeholder.com/150' },
];

const Products = ({ addToCart }) => {
    const [filter, setFilter] = useState({ category: '', name: '' });
    const [sort, setSort] = useState({ key: 'price', order: 'asc' });

    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const handleSortChange = (e) => {
        const [key, order] = e.target.value.split('-');
        setSort({ key, order });
    };

    const filteredProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(filter.name.toLowerCase()) &&
            (!filter.category || product.category === filter.category)
        )
        .sort((a, b) => {
            if (sort.order === 'asc') {
                return a[sort.key] > b[sort.key] ? 1 : -1;
            } else {
                return a[sort.key] < b[sort.key] ? 1 : -1;
            }
        });

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Search by name"
                        value={filter.name}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="category"
                        value={filter.category}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Categories</option>
                        <option value="Category 1">Category 1</option>
                        <option value="Category 2">Category 2</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <select className="form-control" onChange={handleSortChange}>
                        <option value="price-asc">Sort by Price: Low to High</option>
                        <option value="price-desc">Sort by Price: High to Low</option>
                        <option value="stock-asc">Sort by Stock: Low to High</option>
                        <option value="stock-desc">Sort by Stock: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="row">
                {filteredProducts.map(product => (
                    <div key={product.id} className="col-md-3">
                        <ProductCard product={product} addToCart={addToCart} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
