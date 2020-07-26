import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ChatLikeAppLogo from './ChatLikeAppLogo'

const ChatLikeAppLogoRow = ({
    children,
    ...props
}) => {
    return (
        <Row {...props}>
            <Col xs={{span:10, offset:1}} md={{span:8, offset:2}} lg={{span:8, offset: 0}}>
                <ChatLikeAppLogo />
            </Col>
            {children}
        </Row>
    )
}

export default ChatLikeAppLogoRow