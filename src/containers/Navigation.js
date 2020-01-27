import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';

class Navigation extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#">114514</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/messages">オォン!アォン!</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            </Nav>
        </Navbar>
        )
    }
}

export default Navigation;