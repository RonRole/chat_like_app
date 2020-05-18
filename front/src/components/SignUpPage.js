import React from 'react'
import { Container } from 'react-bootstrap'
import SignUpPageTitle from './SignUpPageTitle'
import SignUpPageForm from './SignUpPageForm'

class SignUpPage extends React.Component {
    render() {
        return (
            <Container>
                <SignUpPageTitle />
                <SignUpPageForm />
            </Container>
        )
    }
}

export default SignUpPage