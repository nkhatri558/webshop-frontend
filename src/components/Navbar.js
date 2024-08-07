// src/components/Navbar.js
import '../css/Navbar.css';
import {Button, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useNavigate} from "react-router-dom";
import React from "react";

const NavigationBar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const handleLogout = () => {
        sessionStorage.setItem("user", null);
        navigate("/login");
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Webshop</Navbar.Brand>
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
                <Nav className="ms-auto">
                    <Navbar.Text className="me-3">
                        {user ? `Signed in as: ${user.firstName}`
                            || 'Joined in as: Guest' : 'Joined in as: Guest'}
                    </Navbar.Text>
                    {user ? (<>
                            <Button variant="outline-secondary" onClick={handleLogout}>
                                Logout
                            </Button>
                    </>) :
                        (<Button variant="outline-secondary" onClick={()=>navigate('/login')}>
                            Login
                        </Button>)
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
