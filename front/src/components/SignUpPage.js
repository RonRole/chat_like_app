import React from 'react'
import { Container, Card, Col } from 'react-bootstrap'
import SignUpPageTitle from './SignUpPageTitle'
import SignUpPageForm from './SignUpPageForm'
import ChatLikeAppLogo from './ChatLikeAppLogo'
import ChatLikeAppLogoRow from './ChatLikeAppLogoPage'

const SignUpFormCard = ({
    ...props
}) => {
    return (
        <Card {...props}>
            <Card.Body>
                <SignUpPageTitle />
                <SignUpPageForm />
            </Card.Body>
        </Card>
    )
}

const SignUpPage = () => {
    return (
        <Container>
            <ChatLikeAppLogoRow className='vh-80 align-items-center'>
                <Col xs={12} sm={{span:8, offset:2}} md={{span:6, offset:3}} lg={{span:4, offset:0}}>
                    <SignUpFormCard />
                </Col>
            </ChatLikeAppLogoRow>
        </Container>
    )
}

export default SignUpPage