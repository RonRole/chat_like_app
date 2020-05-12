import React from 'react'
import { Navbar, Nav, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Sidebar = ({
    style={}
}) => {
    return (
        <Row>
            <Col xs={{span:8}} sm={{span:6}} md={{span:4}} className='position-fixed h-100' style={{zIndex:3}}>
                <nav className='navbar navbar-expand-sm navbar-dark bg-dark h-100'>
                    <Nav 
                        className='navbar-nav' 
                            style={{
                            ...style,
                            display:'block',    
                            height:'100%'
                        }}
                    >
                        <Link className='nav-link' onClick={()=>alert('Unko')}>Alert Unko</Link>
                        <Link className = "nav-link" to="/talk_rooms">Sawai</Link>
                        <Link className = "nav-link" to="/talk_rooms">Sawai</Link>
                    </Nav>
                </nav>
            </Col>
        </Row>
    )
}

export default Sidebar