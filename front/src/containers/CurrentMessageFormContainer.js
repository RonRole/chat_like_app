import React, { useState } from 'react'
//import { Actions, Variants } from '../modules/TalkRoomMessageModule'
import TalkRoomMessageModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'

import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
import { withRouter } from 'react-router-dom'
import ShowMessageImageFormButton from './ShowMessageImageFormButton'

const MessageFormContainer = ({
    match
}) => {
    const loginUser = useSelector(state=>state.logStatus.isLoggedIn)
    const dispatch = useDispatch()
    const startInputting = () => dispatch(CurrentRoomStatusModule.actions.changeCurrentUserStatus({
        talkRoomId : match.params.id,
        userId : loginUser.id,
        status : '入力中'
    }))
    const finishInputting = () => dispatch(CurrentRoomStatusModule.actions.changeCurrentUserStatus({
        talkRoomId : match.params.id,
        userId : loginUser.id,
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
                    user      : loginUser
                }))
                finishInputting()
                e.currentTarget.inputMessage.value=''
            }}>
                <Form.Control 
                    name="inputMessage" 
                    type="text" 
                    placeholder="メッセージを入力してね" 
                    onFocus={startInputting}
                    onChange={startInputting}
                    onBlur={finishInputting}
                    required
                />
                <ShowMessageImageFormButton />
                <Button variant="warning" type="submit">▶</Button>
            </Form>
        </Container>
    )
}

export default withRouter(MessageFormContainer)
