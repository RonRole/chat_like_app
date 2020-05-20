import React, { useState } from 'react'
import SidebarBody from './SidebarBody'
import SidebarCursor from './SidebarCursor'
import { CSSTransition } from 'react-transition-group'

const Sidebar = ({
    children
}) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='sidebar'>
            <CSSTransition in={open} classNames='slide' timeout={0}>
                <div className='sidebar_open d-flex position-fixed h-100'>
                    <SidebarBody>
                        {children}
                    </SidebarBody>
                    <SidebarCursor onClickCursor={() => setOpen(!open)} pointRightSide={!open}/>
                </div>
            </CSSTransition>
        </div>
    )
}

export default Sidebar