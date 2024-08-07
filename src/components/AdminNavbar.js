import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {useNavigate} from "react-router-dom";

function AdminNavbar() {
    const navigate = useNavigate();

    function handleLogout() {
        sessionStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/admin">Admin Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/admin/manage-products">
                        <Nav.Link>Manage Products</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/admin/manage-orders">
                        <Nav.Link>Manage Orders</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/admin/manage-inventory">
                        <Nav.Link>Manage Inventory</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav className="ms-auto">
                    <Navbar.Text className="me-3">
                        Signed in as: Admin
                    </Navbar.Text>
                    <Button variant="outline-secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default AdminNavbar;
