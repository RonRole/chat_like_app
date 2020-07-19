import React from 'react'
import { withRouter } from "react-router-dom"
import { Row, Col } from "react-bootstrap"
import LoginForm from "../containers/LoginForm"

const LoginFormWithRouter = ({
    history,
    ...props
}) => (
    <LoginForm history={history} {...props}/>
)

export default withRouter(LoginFormWithRouter)