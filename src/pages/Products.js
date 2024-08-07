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
    const [productQuantities, setProductQuantities] = useState({});
    const productsPerPage = 9;

    const fetchProducts = async () => {
        try {
            const response = await axios
                .get("/products")
                .then( response => {
                    setProducts(response.data);
                    const initialQuantities = response.data.reduce((acc, product) => {
                        acc[product.id] = 1;
                        return acc;
                    }, {});
                    setProductQuantities(initialQuantities);
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
        // const found = updatedCart.find(item => item.id === product.id);
        // let quant = 1;
        //
        // if (found) {
        //     productQuantities[found.id] += productQuantities[product.id];
        // } else {
        //     updatedCart.push({ ...product, quantity:productQuantities[found.id] });
        // }
        updatedCart.push({...product, quantity: productQuantities[product.id] > 0 ? productQuantities[product.id] : 1});

        setCart(updatedCart);
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

    const handleQuantityChange = (productId, event) => {
        setProductQuantities({
            ...productQuantities,
            [productId]: Number(event.target.value),
        });
    };



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
                        <Card className="mb-4 product-card">
                            <div className="product-image-container">
                                <Card.Img
                                    variant="top"
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                            </div>
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    {product.description}
                                    <br/>
                                    <strong>${product.price}</strong>
                                </Card.Text>
                                <Form.Group controlId="formQuantity">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        value={productQuantities[product.id]}
                                        onChange={(event) => handleQuantityChange(product.id, event)}
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
                {Array.from({length: Math.ceil(filteredProducts.length / productsPerPage)}, (_, index) => (
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