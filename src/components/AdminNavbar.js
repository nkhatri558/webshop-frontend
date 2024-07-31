import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function AdminNavbar() {
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
            </Navbar.Collapse>
        </Navbar>
    );
}

export default AdminNavbar;
