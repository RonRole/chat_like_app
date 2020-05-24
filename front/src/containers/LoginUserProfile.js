import React from 'react'
import { useSelector } from 'react-redux'
import UserProfile from '../components/UserProfile'

const LoginUserProfile = ({
    without
}) => {
    const loginUser = useSelector(state=>state.logStatus.isLoggedIn)
    return (
        <UserProfile user={loginUser} without={without} />
    )   
}
LoginUserProfile.defaultProps = {
    without : ''
}
export default LoginUserProfile