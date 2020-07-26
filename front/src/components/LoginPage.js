import React from 'react'
import { Container, Alert, Row, Col, Card } from 'react-bootstrap'
import WrapWithFlashMessage from './WrapWithFlashMessage'
import ChatLikeAppLogoRow from './ChatLikeAppLogoPage'
import styled from 'styled-components'
import LoginForm from '../containers/LoginForm'
import { withRouter, Link } from 'react-router-dom'

const InlineBlock = styled.div`
    display:inline-block;
`

const LoginFormCard = ({
    ...props
}) => {
    return (
        <Card {...props}>
            <Card.Body>
                <WrapWithFlashMessage>
                    <InlineBlock as='strong'>ログイン</InlineBlock>
                    <LoginForm />
                    <InlineBlock>初めての方はこちら：</InlineBlock>
                    <InlineBlock><Link to='/signup' {...props}>新規登録</Link></InlineBlock>
                </WrapWithFlashMessage>
            </Card.Body>
        </Card>
    )
}

const StyledChatLikeAppLogoRow = styled(ChatLikeAppLogoRow)`
    height: 80vh;
    align-items: center;
`


const LoginPage = () => {
    return (
        <Container>
            <StyledChatLikeAppLogoRow>
                <Col xs={12} sm={{span:8, offset:2}} md={{span:6, offset:3}} lg={{span:4, offset:0}}>
                    <LoginFormCard />
                </Col>
            </StyledChatLikeAppLogoRow>
        </Container>
    )
}


export default withRouter(LoginPage)