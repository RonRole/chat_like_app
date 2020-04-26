import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand>CHAT LIKE APP</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Link className = "nav-link" to="/home">Home</Link>
                        <Link className = "nav-link" to="/signup">Sign Up</Link>
                        <Link className = "nav-link" to="/login">Sign in</Link>
                        <Link className = "nav-link" to="/talk_rooms">TalkRoom</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation;