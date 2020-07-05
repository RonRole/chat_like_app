import React from 'react'
import { Nav } from 'react-bootstrap'

const SidebarCursor = ({
    onClickCursor,
    pointRightSide
}) => (
    <div className='sidebar-cursor pointer' onClick={onClickCursor}>
        <nav className='navbar navbar-dark bg-dark h-100 d-flex justify-content-center'>
            <Nav className='navbar-nav'>
                <a className='nav-link'>{pointRightSide ? '▶︎' : '◀︎'}</a>
            </Nav>
        </nav>
    </div>
)

const SmallCursor = ({
    onClickCursor,
    pointRightSide
}) => (
    <div className='sidebar-cursor pointer' onClick={onClickCursor}>
        <nav className='navbar navbar-dark bg-dark d-flex justify-content-center'>
            <Nav className='navbar-nav'>
                <a className='nav-link'>{pointRightSide ? '▶︎' : '◀︎'}</a>
            </Nav>
        </nav>
    </div>
)
SidebarCursor.SmallCursor = SmallCursor

SidebarCursor.defaultProps = 
SidebarCursor.SmallCursor.defaultProps = {
    onClickCursor : () => console.log('cursor clicked'),
    pointRightSide : true
}

export default SidebarCursor