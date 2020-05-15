import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';

class ChatLikeAppNavigation extends React.Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand>CHAT LIKE APP</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        {this.props.children}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default ChatLikeAppNavigation;