import React from 'react'
import { Nav } from 'react-bootstrap'

const SidebarCursor = ({
    onClickCursor,
    pointRightSide
}) => (
    <div className='sidebar_cursor' onClick={onClickCursor}>
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark h-100 w-100 d-flex justify-content-center'>
            <Nav className='navbar-nav'>
                <a className='nav-link'>{pointRightSide ? '▶︎' : '◀️'}</a>
            </Nav>
        </nav>
    </div>
)

SidebarCursor.defaultProps = {
    onClickCursor : () => console.log('cursor clicked'),
    pointRightSide : true
}

export default SidebarCursor