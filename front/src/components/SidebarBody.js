import React from 'react'
import { Nav, Col } from 'react-bootstrap'


const SidebarBody = ({
    spanMap,
    children=[]
}) => {
    return (
        <Col xs={{span:spanMap.xs}} 
            sm={{span:spanMap.sm}} 
            md={{span:spanMap.md}}
            lg={{span:spanMap.lg}} 
            className='position-fixed h-100' 
            style={{zIndex:3,paddingRight:0}}>
            <nav className='navbar navbar-expand-sm navbar-dark bg-dark h-100 w-100'>
                <Nav className='navbar-nav' style={{display:'block',height:'100%'}}>
                    {children}
                </Nav>
            </nav>
        </Col>
    )
}

SidebarBody.defaultProps = {
   spanMap : {xs:5,sm:4,md:3,lg:2}
}

export default SidebarBody