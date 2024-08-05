// src/components/Navbar.js
import React, {useContext} from 'react';
// import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Link, useNavigate} from "react-router-dom";

const NavigationBar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const handleLogout = () => {
        sessionStorage.setItem("user", null);
        navigate("/login");
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Web shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/customer/products">
                        <Nav.Link>Products</Nav.Link>
                    </LinkContainer>
                    {user && user.email !== 'guest@guest.com' && (
                            <Nav.Link href="/customer/orders">Orders</Nav.Link>
                        )}
                    <LinkContainer to="/customer/cart">
                        <Nav.Link>Cart</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Navbar.Text>
                    Signed in as: {user ? user.firstName || 'Guest' : 'Guest'}
                </Navbar.Text>
                {user ? (<>
                    <button onClick={handleLogout}>Logout</button>
                </>) :
                    (<Link to="/login">Login</Link>)
                }
            </Navbar.Collapse>
        </Navbar>
        // <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //     <div className="container">
        //         <Link className="navbar-brand" to="/">Webshop</Link>
        //         <div className="collapse navbar-collapse" id="navbarNav">
        //             <ul className="navbar-nav ml-auto">
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="/">Products</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="/orders">Orders</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="/cart">
        //                         Cart <span className="badge badge-pill badge-primary"></span>
        //                     </Link>
        //                 </li>
        //             </ul>
        //             <Navbar.Text>
        //                 Signed in as: {user ? user.firstName || 'Guest' : 'Guest'}
        //             </Navbar.Text>
        //         </div>
        //     </div>
        // </nav>
    );
};

export default NavigationBar;
