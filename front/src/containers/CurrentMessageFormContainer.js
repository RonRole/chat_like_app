import React from 'react'
//import { Actions, Variants } from '../modules/TalkRoomMessageModule'
import TalkRoomMessageModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'

import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'

const MessageFormContainer = ({
    talkRoomId
}) => {
    const loginUser = useSelector(state=>state.logStatus.isLoggedIn)
    const dispatch = useDispatch()
    const startInputting = () => dispatch(CurrentRoomStatusModule.actions.changeCurrentUserStatus({
        talkRoomId,
        userId : loginUser.id,
        status : '入力中'
    }))
    const finishInputting = () => dispatch(CurrentRoomStatusModule.actions.changeCurrentUserStatus({
        talkRoomId,
        userId : loginUser.id,
        status : ''
    }))
    return (
        <Container>
            <Form
                className='row mb-2'
                onSubmit = {e => {
                    e.preventDefault()
                    dispatch(TalkRoomMessageModule.actions.addMessage({
                        roomId    : talkRoomId,
                        className : "myMessage",
                        text      : e.currentTarget.inputMessage.value,
                        user      : loginUser
                    }))
                    finishInputting()
                    e.currentTarget.inputMessage.value=''
                }
            }>
                <Form.Control 
                    className = 'col-10 col-lg-11'
                    name="inputMessage" 
                    type="text" 
                    placeholder="メッセージを入力してね" 
                    onFocus={startInputting}
                    onChange={startInputting}
                    onBlur={finishInputting}
                    required
                />
                <Button className='col-2 col-lg-1' variant="warning" type="submit">▶</Button>
            </Form>
        </Container>
    )
}

export default MessageFormContainer
