import React from 'react'
import { useSelector } from 'react-redux'
import UpdateUserForm from './UpdateUserForm'

const UpdateLoginUserForm = ({
    show,
    onCancel
}) => {
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    return (
        <UpdateUserForm userId={loginUser.id} show={show} onCancel={onCancel} />
    )
}

UpdateLoginUserForm.defaultProps = {
    show : false,
    onCancel : () => console.log('set onCancel event on UpdateLoginUserForm')
}

export default UpdateLoginUserForm