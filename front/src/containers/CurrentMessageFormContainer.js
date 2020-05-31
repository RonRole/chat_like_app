import React, { useState } from 'react'
//import { Actions, Variants } from '../modules/TalkRoomMessageModule'
import TalkRoomMessageModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'

import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
import { withRouter } from 'react-router-dom'
import MessageImageModalForm from './MessageImageModalForm'

const MessageFormContainer = ({
    match
}) => {
    const [messageImageModalShow, setMessageImageModalShow] = useState(false)
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
                    <Col xs={8} sm={8} md={9} lg={10}>
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
                    <Col xs={2} sm={2} md={2} lg={1}>
                        <Button variant='primary' onClick={()=>{
                            startInputting()
                            setMessageImageModalShow(true)
                        }}>Image</Button>
                    </Col>
                    <Col xs={2} sm={2} md={1} lg={1}>
                        <Button variant="warning" type="submit">▶</Button>
                    </Col>
                </Row>
            </Form>

            <MessageImageModalForm show={messageImageModalShow} onCancel={() => {
                setMessageImageModalShow(false)
                finishInputting()
            }} />
        </Container>
    )
}

export default withRouter(MessageFormContainer)
