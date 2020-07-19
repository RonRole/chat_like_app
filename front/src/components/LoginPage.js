import React from 'react'
import { Container, Alert, Row, Col, Card } from 'react-bootstrap'
import LoginFormWithRouter from './LoginPageForm'
import LoginPageTitle from './LoginPageTitle'
import WrapWithFlashMessage from './WrapWithFlashMessage'
import LinkToSignUpPage from './LinkToSignUpPage'
import ChatLikeAppLogoRow from './ChatLikeAppLogoPage'
import ChatLikeAppLogo from './ChatLikeAppLogo'

const LoginFormCard = ({
    ...props
}) => {
    return (
        <Card {...props}>
            <Card.Body>
                <WrapWithFlashMessage>
                    <LoginPageTitle />
                    <LoginFormWithRouter className='mb-2' />
                    <div className='d-flex justify-content-center'>
                        初めての方はこちら：
                        <LinkToSignUpPage />
                    </div>
                </WrapWithFlashMessage>
            </Card.Body>
        </Card>
    )
}


const LoginPage = () => {
    return (
        <Container>
            <ChatLikeAppLogoRow className='vh-80 align-items-center'>
                <Col xs={12} sm={{span:8, offset:2}} md={{span:6, offset:3}} lg={{span:4, offset:0}}>
                    <LoginFormCard />
                </Col>
            </ChatLikeAppLogoRow>
        </Container>
    )
}


export default LoginPage