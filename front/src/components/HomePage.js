import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import LoginUserProfile from '../containers/LoginUserProfile'
import UpdateLoginUserForm from '../containers/UpdateLoginUserForm'
import LogoutButton from '../containers/LogoutButton'

const HomePage = () => {
    const [showUpdateUserForm, setUpdateUserFormShowing] = useState(false)


    return (
        <Container className="justify-content-end">
            <LoginUserProfile className='mb-2' />
            <div className="d-flex justify-content-center mb-2">
                <Button onClick={() => setUpdateUserFormShowing(true)}>プロフィールを更新する</Button>
            </div>
            <div className="d-flex justify-content-center">
                <LogoutButton>ログアウト</LogoutButton>
            </div>
            <UpdateLoginUserForm show={showUpdateUserForm} onCancel={() => setUpdateUserFormShowing(false)} />
        </Container>
    )
}

export default HomePage
