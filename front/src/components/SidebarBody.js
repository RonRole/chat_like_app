import React from 'react'
import { Nav } from 'react-bootstrap'



const SidebarBody = ({
    children=[],
}) => {
    return (
        <div className='h-100 sidebar_body'>
            <nav className='navbar navbar-expand-sm navbar-dark bg-dark h-100'>
                <Nav className='sidebar_items navbar-nav h-100'>
                    {children}
                </Nav>
            </nav>
        </div>
    )
}


export default SidebarBody