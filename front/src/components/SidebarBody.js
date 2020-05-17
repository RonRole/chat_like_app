import React from 'react'
import { Nav, Col, Button } from 'react-bootstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'


const SidebarBody = ({
    children=[],
    className='',
    style={}
}) => {
    return (
        <div className={className} style={style}>
            <nav className='navbar navbar-expand-sm navbar-dark bg-dark h-100'>
                <Nav className='navbar-nav' style={{display:'block',height:'100%'}}>
                    {children}
                </Nav>
            </nav>
        </div>
    )
}

SidebarBody.defaultProps={
    className:'h-100',
    style:{width:'40vw', maxWidth:'300px'}
}

export default SidebarBody