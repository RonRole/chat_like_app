import React from 'react'
import { useSelector } from 'react-redux'
import UserProfile from './UserProfile'

const LoginUserProfile = ({
    without,
    ...props
}) => {
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    return (
        <UserProfile userId={loginUser.id} without={without} {...props}/>
    )   
}
LoginUserProfile.defaultProps = {
    without : '',
    className : ''
}
export default LoginUserProfile