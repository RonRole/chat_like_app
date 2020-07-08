import React from 'react'
import { Container, Alert, Row, Col } from 'react-bootstrap'
import LoginFormWithRouter from './LoginPageForm'
import LoginPageTitle from './LoginPageTitle'
import WrapWithFlashMessage from './WrapWithFlashMessage'
import LinkToSignUpPage from './LinkToSignUpPage'

const LoginPage = ({
    ...props
}) => {
    return (
        <Container {...props}>
            <WrapWithFlashMessage>
                <LoginPageTitle />
                <LoginFormWithRouter className='mb-2' />
                <div className='d-flex justify-content-center'>
                    初めての方はこちら：
                    <LinkToSignUpPage />
                </div>
            </WrapWithFlashMessage>
        </Container>
    )
}


export default LoginPage