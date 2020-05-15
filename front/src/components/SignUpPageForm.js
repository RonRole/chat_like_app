import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import SignUpForm from '../containers/SignUpForm'
import { withRouter } from 'react-router-dom'

const SignUpPageForm = ({history}) => (
    <Row>
        <Col xs={{span:10, offset:1}} sm={{span:8, offset:2}} md={{span:6,offset:3}} lg={{span:4,offset:4}}>
            <SignUpForm history={history}/>
        </Col>
    </Row>
)


export default withRouter(SignUpPageForm)