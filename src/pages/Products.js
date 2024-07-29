import React, {useEffect, useState} from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import '../css/Products.css';
import axios from "../api/axios";
import Swal from "sweetalert2";

const Products = ({ cart, setCart, cartCount, setCartCount }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const productsPerPage = 9;

    const fetchProducts = async () => {
        try {
            const response = await axios
                .get("/products")
                .then( response => {
                    console.log(response.data);
                    setProducts(response.data);
                    }
                );
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const addToCart = (product) => {
        const updatedCart = [...cart];
        const found = updatedCart.find(item => item.id === product.id);
        let quant = 1;

        if (found) {
            found.quantity += 1;
            quant = found.quantity;
        } else {
            updatedCart.push({ ...product, quantity: 1 });
        }

        setCart(updatedCart);
        setCartCount(cartCount + quant);
        Swal.fire({
            icon: 'success',
            title: 'Added to Cart',
            text: `${product.name} has been added to your cart.`,
            timer: 1500
        });
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

    const filteredProducts = products
        .filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === '' || product.category === selectedCategory)
        );

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
                                <Form.Group controlId="formQuantity">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={() => addToCart(product)}>
                                    Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <ul className="pagination">
                {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
                     <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                         <button onClick={() => paginate(index + 1)} className="page-link">
                             {index + 1}
                         </button>
                     </li>
                 ))}
             </ul>
        </div>
    );
};

export default Products;