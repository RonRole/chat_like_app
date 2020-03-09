import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>CHAT LIKE APP</Navbar.Brand>
                <Nav className="mr-auto">
                    <Link className = "nav-link" to="/home">Home</Link>
                    <Link className = "nav-link" to="/signup">Sign Up</Link>
                    <Link className = "nav-link" to="/login">Sign in</Link>
                    <Link className = "nav-link" to="/talk_rooms">TalkRoom</Link>
                </Nav>
            </Navbar>
        )
    }
}

export default Navigation;