import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UpdateUserForm from './UpdateUserForm'
import { Button } from 'react-bootstrap'

const UpdateLoginUserForm = ({
    show,
    onHide
}) => {
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    return (
        <UpdateUserForm userId={loginUser.id} show={show} onHide={onHide} />
    )
}

UpdateLoginUserForm.defaultProps = {
    show : false,
    onCancel : () => console.log('set onCancel event on UpdateLoginUserForm')
}

const ShowButton = ({
    children,
    ...props
}) => {
    const [showUpdateUserForm, setUpdateUserFormShowing] = useState(false)
    return (
        <>
            <Button onClick={() => {
                setUpdateUserFormShowing(true)
            }} {...props}>
                {children}
            </Button>
            <UpdateLoginUserForm show={showUpdateUserForm} onHide={() => setUpdateUserFormShowing(false)} />
        </>
    )
}


UpdateLoginUserForm.ShowButton = ShowButton

export default UpdateLoginUserForm