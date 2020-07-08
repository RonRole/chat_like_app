import React, { useState } from 'react'
import { Button, Container, Col } from 'react-bootstrap'
import LoginUserProfile from '../containers/LoginUserProfile'
import UpdateLoginUserForm from '../containers/UpdateLoginUserForm'
import LogoutButton from '../containers/LogoutButton'
import BgmManageModal from '../containers/BgmManageModal'
import Sidebar from './Sidebar'
import MessageImageManageModal from '../containers/MessageImageManageModal'

const HomePage = ({
    ...props
}) => {
    return (
        <div {...props}>
            <Sidebar>
                <BgmManageModal.ShowLink to='#' className='nav-link' />
                <MessageImageManageModal.ShowLink to='#' className='nav-link'/>
            </Sidebar>
            <Container className="justify-content-center">
                <LoginUserProfile className='mb-2' />
                <UpdateLoginUserForm.ShowButton wrapperClassName='d-flex justify-content-center mb-2'/>
                <div className='d-flex justify-content-center mb-2'>
                    <LogoutButton>ログアウト</LogoutButton>
                </div>
            </Container>
        </div>
    )
}

export default HomePage
