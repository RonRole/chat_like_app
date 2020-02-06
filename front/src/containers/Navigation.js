import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#">114514</Navbar.Brand>
                <Nav className="mr-auto">
                    <Link className = "nav-link" to="/">Home</Link>
                    <Link className = "nav-link" to="/login">Login</Link>
                    <Link className = "nav-link" to="/messages">Message</Link>
                    <Link className = "nav-link" to="/about">About</Link>
                </Nav>
            </Navbar>
        )
    }
}

export default Navigation;