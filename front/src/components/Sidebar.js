import React, { useState } from 'react'
import SidebarBody from './SidebarBody'
import SidebarCursor from './SidebarCursor'
import { CSSTransition } from 'react-transition-group'

const Sidebar = ({
    children,
    className,
    ...props
}) => {
    const [open, setOpen] = useState(false)
    return (
        <div className={`sidebar ${className}`}>
            <CSSTransition in={open} classNames='slide' timeout={0}>
                <div className='sidebar-open d-flex position-fixed h-100'>
                    <SidebarBody>
                        {children}
                    </SidebarBody>
                    <SidebarCursor onClickCursor={() => setOpen(!open)} pointRightSide={!open}/>
                </div>
            </CSSTransition>
        </div>
    )
}

const SmallSidebar = ({
    children,
    className,
    ...props
}) => {
    const [open, setOpen] = useState(false)
    return (
        <div className={`sidebar ${className}`}>
            <CSSTransition in={open} classNames='slide' timeout={0}>
                <div className='sidebar-open d-flex position-fixed h-100'>
                    <SidebarBody>
                        {children}
                    </SidebarBody>
                    <SidebarCursor.SmallCursor onClickCursor={() => setOpen(!open)} pointRightSide={!open}/>
                </div>
            </CSSTransition>
        </div>
    )
}

Sidebar.Small = SmallSidebar

export default Sidebar