import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import SignUpForm from '../containers/SignUpForm'

class SignUpPage extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col xs={{span:10, offset:1}} sm={{span:8, offset:2}} md={{span:6,offset:3}} lg={{span:4,offset:4}}>
                        <strong>新規登録</strong>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{span:10, offset:1}} sm={{span:8, offset:2}} md={{span:6,offset:3}} lg={{span:4,offset:4}}>
                        <SignUpForm history={this.props.history}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SignUpPage