import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import UserProfile from '../components/UserProfile'
import { Button, Container } from 'react-bootstrap'
import UpdateUserForm from './UpdateUserForm'
import LogModule from '../modules/logModule/LogModule'
import { withRouter } from 'react-router-dom'

const HomePage = ({
    history
}) => {
    const [showUpdateUserForm, setUpdateUserFormShowing] = useState(false)
    const loginUser = useSelector(state => state.logStatus.isLoggedIn)
    const dispatch = useDispatch()
    return (
        <Container className="justify-content-end">
            <UserProfile user={loginUser} className="mb-2"/>
            <div className="d-flex justify-content-center mb-2">
                <Button onClick={() => setUpdateUserFormShowing(true)}>プロフィールを更新する</Button>
            </div>
            <div className="d-flex justify-content-center">
                <Button variant='danger' onClick={() => dispatch(LogModule.actions.execLogout({history}))}>ログアウト</Button>
            </div>
            <UpdateUserForm user={loginUser} show={showUpdateUserForm} onCancel={() => setUpdateUserFormShowing(false)} />
        </Container>
    )
}

export default withRouter(HomePage)
