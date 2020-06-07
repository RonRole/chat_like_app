import React from 'react'
import { useSelector } from 'react-redux'
import UserProfile from '../components/UserProfile'

const LoginUserProfile = ({
    without,
    className
}) => {
    const loginUser = useSelector(state=>state.logStatus.isLoggedIn)
    return (
        <UserProfile className={className} user={loginUser} without={without} />
    )   
}
LoginUserProfile.defaultProps = {
    without : '',
    className : ''
}
export default LoginUserProfile