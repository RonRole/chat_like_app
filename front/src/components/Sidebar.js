import React, { useState } from 'react'
import styled from 'styled-components'
import { Navbar, Nav } from 'react-bootstrap'

const SidebarNavbar = styled(Navbar)`
    height:100%;
    width:20rem;
    display:block;
`

const SidebarCursorNavbar = styled(Navbar)`
    height:${props=>props.height};
    width:.8rem;
    justify-content: center;
    font-size:.8rem;
    position:relative;
    transition: all 0.2s;
    cursor:pointer;
    &:hover {
        opacity:0.5;
        transition: all 0.2s;
    }
`

const SidebarWrapper = styled.nav`
    font-size:1rem;
    position:fixed;
    display: flex;
    height:100%;
    left:-20rem; 
    transition: all 0.5s;
    z-index:1;
    &[open] {
        left:0;
        transition:all 0.5s;
    }
`

const Sidebar = ({
    children,
    small,
    ...props
}) => {
    const [open, setOpen] = useState(false)
    const cursorHeight = small ? '5%' : '100%'
    return (
        <SidebarWrapper open={open} {...props}>
            <SidebarNavbar bg='dark' variant='dark'>
                <Nav>
                    <div>{children}</div>
                </Nav>
            </SidebarNavbar>
            <SidebarCursorNavbar height={cursorHeight} bg='dark' variant='dark' onClick={()=>setOpen(!open)}>
                <Nav>
                    <Nav.Link>{open ? '◀︎' : '▶︎'}</Nav.Link>
                </Nav>
            </SidebarCursorNavbar>
        </SidebarWrapper>
    )
}

export default Sidebar