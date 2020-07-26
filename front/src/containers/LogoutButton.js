import React from 'react'
import LogModule from '../modules/logModule/LogModule'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

const LogoutButton = ({
    children,
    history,
    ...props
}) => {
    const dispatch = useDispatch()
    return (
        <Button variant='danger' onClick={() => dispatch(LogModule.actions.execLogout({history}))} {...props}>{children}</Button>
    )
}

LogoutButton.defaultProps = {
    children:'ログアウト',
}

export default withRouter(LogoutButton)