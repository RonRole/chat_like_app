import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';

const ChatLikeAppNavbar= ({
    children,
    ...props
}) => {
    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" sticky="top" {...props}>
            <Navbar.Brand>CHAT LIKE APP</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav>
                    {children}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default ChatLikeAppNavbar;