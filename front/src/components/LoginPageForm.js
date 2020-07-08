import React from 'react'
import { withRouter } from "react-router-dom"
import { Row, Col } from "react-bootstrap"
import LoginForm from "../containers/LoginForm"

const LoginFormWithRouter = ({
    history,
    ...props
}) => (
    <Row {...props}>
        <Col xs={{span:10, offset:1}} sm={{span:8, offset:2}} md={{span:6,offset:3}} lg={{span:4,offset:4}}>
            <LoginForm history={history}/>
        </Col>
    </Row>
)

export default withRouter(LoginFormWithRouter)