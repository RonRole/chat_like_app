import React, { useState } from 'react'
import { Button, Container, Col } from 'react-bootstrap'
import LoginUserProfile from '../containers/LoginUserProfile'
import UpdateLoginUserForm from '../containers/UpdateLoginUserForm'
import LogoutButton from '../containers/LogoutButton'
import BgmManageModal from '../containers/BgmManageModal'
import Sidebar from './Sidebar'
import MessageImageManageModal from '../containers/MessageImageManageModal'
import Size from '../style-components/Size'

const HomePage = ({
    ...props
}) => {
    return (
        <div {...props}>
            <Sidebar className='d-none d-md-flex'>
                <BgmManageModal.ShowLink to='#' className='nav-link' />
                <MessageImageManageModal.ShowLink to='#' className='nav-link'/>
            </Sidebar>
            <Sidebar className='d-md-none' small>
                <BgmManageModal.ShowLink to='#' className='nav-link' />
                <MessageImageManageModal.ShowLink to='#' className='nav-link'/>
            </Sidebar>
            <Container className="d-flex justify-content-center">
                <Size width='50%'>
                    <LoginUserProfile className='justify-content-center' />
                    <UpdateLoginUserForm.ShowButton wrapperClassName='d-flex justify-content-center mb-2' block/>
                    <div className='d-flex justify-content-center mb-2'>
                        <LogoutButton block>ログアウト</LogoutButton>
                    </div>
                </Size>
            </Container>
        </div>
    )
}

export default HomePage
