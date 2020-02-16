import React from 'react'
import { Container, Alert } from 'react-bootstrap'
import LoginForm from '../containers/LoginForm'

class LoginPage extends React.Component {
    render() {
        return (
            <Container>
                {this.props.location.flash ? 
                    <Alert variant="danger">{this.props.location.flash}</Alert> : ""}
                <strong>ログインページ</strong>
                <LoginForm history={this.props.history}/>
            </Container>
        )
    }
}

export default LoginPage