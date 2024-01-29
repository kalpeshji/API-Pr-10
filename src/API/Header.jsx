import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function Header() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">API</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link><Link to={'/home'} className='text-reset text-decoration-none'>Home</Link></Nav.Link>
                    <Nav.Link><Link to={'/about'} className='text-reset text-decoration-none'>About</Link></Nav.Link>
                    <Nav.Link><Link to={'/products'} className='text-reset text-decoration-none'>Product</Link></Nav.Link>
                </Nav>
                <button className='btn btn-outline-light'><Link to={'/login'} className='text-reset text-decoration-none'>Log Out</Link></button>
            </Container>
        </Navbar>
    )
}
