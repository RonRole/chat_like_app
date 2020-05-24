import React from 'react'
//import { Actions, Variants } from '../modules/TalkRoomMessageModule'
import TalkRoomMessageModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'

import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
import { withRouter } from 'react-router-dom'

const MessageFormContainer = ({
    match
}) => {
    const logStatus = useSelector(state=>state.logStatus)
    const dispatch = useDispatch()
    const startInputting = () => dispatch(CurrentRoomStatusModule.actions.changeCurrentUserStatus({
        talkRoomId : match.params.id,
        userId : logStatus.isLoggedIn.id,
        status : '入力中'
    }))
    const finishInputting = () => dispatch(CurrentRoomStatusModule.actions.changeCurrentUserStatus({
        talkRoomId : match.params.id,
        userId : logStatus.isLoggedIn.id,
        status : ''
    }))
    return (
        <Container>
            <Form onSubmit = {e => {
                e.preventDefault()
                dispatch(TalkRoomMessageModule.actions.addMessage({
                    roomId    : match.params.id,
                    className : "myMessage",
                    text      : e.currentTarget.inputMessage.value,
                    user      : logStatus.isLoggedIn
                }))
                finishInputting()
                e.currentTarget.inputMessage.value=''
            }}>
                <Row>
                    <Col xs={10} sm={10} md={11}>
                        <Form.Control 
                            name="inputMessage" 
                            type="text" 
                            placeholder="メッセージを入力してね" 
                            onFocus={startInputting}
                            onChange={startInputting}
                            onBlur={finishInputting}
                            required
                        /> 
                    </Col>
                    <Col xs={2} sm={2} md={1}>
                        <Button variant="warning" type="submit">▶</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default withRouter(MessageFormContainer)
