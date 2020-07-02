import React, { useState } from 'react'
import { Button, Container, Col } from 'react-bootstrap'
import LoginUserProfile from '../containers/LoginUserProfile'
import UpdateLoginUserForm from '../containers/UpdateLoginUserForm'
import LogoutButton from '../containers/LogoutButton'
import BgmManageModal from '../containers/BgmManageModal'
import Sidebar from './Sidebar'

const HomePage = () => {
    const [showUpdateUserForm, setUpdateUserFormShowing] = useState(false)


    return (
        <>
            <Sidebar>
                <BgmManageModal.ShowLink to='#' className='nav-link' />
            </Sidebar>
            <Container className="justify-content-center">
                <LoginUserProfile className='mb-2' />
                <div className='d-flex justify-content-center mb-2'>
                    <Button onClick={() => setUpdateUserFormShowing(true)}>プロフィールを更新する</Button>
                </div>
                <div className='d-flex justify-content-center mb-2'>
                    <LogoutButton>ログアウト</LogoutButton>
                </div>
                <UpdateLoginUserForm show={showUpdateUserForm} onCancel={() => setUpdateUserFormShowing(false)} />
            </Container>
        </>
    )
}

export default HomePage
