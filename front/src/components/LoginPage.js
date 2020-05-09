import React from 'react'
import { Container, Alert, Row, Col } from 'react-bootstrap'
import LoginForm from '../containers/LoginForm'

class LoginPage extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col xs={{span:10, offset:1}} sm={{span:8, offset:2}} md={{span:6,offset:3}} lg={{span:4,offset:4}}>
                        {[this.props.location.flash].filter(e=>e).map((_, index) => <Alert key = {index} variant="danger">{this.props.location.flash}</Alert>)}
                    </Col>
                </Row>
                <Row>
                    <Col xs={{span:10, offset:1}} sm={{span:8, offset:2}} md={{span:6,offset:3}} lg={{span:4,offset:4}}>
                        <strong>ログインページ</strong>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{span:10, offset:1}} sm={{span:8, offset:2}} md={{span:6,offset:3}} lg={{span:4,offset:4}}>
                        <LoginForm history={this.props.history}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default LoginPage