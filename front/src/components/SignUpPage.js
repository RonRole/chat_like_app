import React from 'react'
import { Container, Card, Col, Row } from 'react-bootstrap'

import ChatLikeAppLogoRow from './ChatLikeAppLogoPage'
import styled from 'styled-components'
import SignUpForm from '../containers/SignUpForm'

const CardTitle=styled.strong`
    display:inline-block;
`

const SignUpFormCard = ({
    ...props
}) => {
    return (
        <Card {...props}>
            <Card.Body>
                <CardTitle>新規登録</CardTitle>
                <SignUpForm />
            </Card.Body>
        </Card>
    )
}

const StyledChatLikeAppLogoRow = styled(ChatLikeAppLogoRow)`
    height: 80vh;
    align-items: center;
`

const SignUpPage = () => {
    return (
        <Container>
            <StyledChatLikeAppLogoRow>
                <Col xs={12} sm={{span:8, offset:2}} md={{span:6, offset:3}} lg={{span:4, offset:0}}>
                    <SignUpFormCard />
                </Col>
            </StyledChatLikeAppLogoRow>
        </Container>
    )
}

export default SignUpPage