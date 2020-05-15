import React from 'react'
import { Row, Col } from 'react-bootstrap'


const LoginPageTitle = () => (
    <Row>
        <Col xs={{span:10, offset:1}} sm={{span:8, offset:2}} md={{span:6,offset:3}} lg={{span:4,offset:4}}>
            <strong>ログインページ</strong>
        </Col>
    </Row>
)

export default LoginPageTitle