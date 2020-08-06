import React, { useState } from 'react'
import { Button, Container, Col, Row } from 'react-bootstrap'
import LoginUserProfile from '../containers/LoginUserProfile'
import UpdateLoginUserForm from '../containers/UpdateLoginUserForm'
import LogoutButton from '../containers/LogoutButton'
import BgmManageModal from '../containers/BgmManageModal'
import Sidebar from './Sidebar'
import MessageImageManageModal from '../containers/MessageImageManageModal'
import Size from '../style-components/Size'
import NewsList from '../containers/NewsList'
import SimpleBorder from '../style-components/SimpleBorder'
import UpdatePasswordForm from '../containers/UpdatePasswordForm'

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
                <Size width='100%'>
                    <Row>
                        <Col xs={12} md={6}>
                            <LoginUserProfile infoWidth='50%' imageWidth='50%' className='justify-content-center' />
                            <UpdateLoginUserForm.ShowButton className='mb-2' block>
                                プロフィール更新
                            </UpdateLoginUserForm.ShowButton>
                            <UpdatePasswordForm.ShowButton className='mb-2'block>
                                パスワード変更
                            </UpdatePasswordForm.ShowButton>
                            <LogoutButton block>
                                ログアウト
                            </LogoutButton>
                        </Col>
                        <Col xs={12} md={6}>
                            <SimpleBorder as='h6' position='bottom'><strong>新着情報</strong></SimpleBorder>
                            <Size height='80vh' className='overflow-auto'>
                                <NewsList />
                            </Size>
                        </Col>
                    </Row>
                </Size>
            </Container>
        </div>
    )
}

export default HomePage
