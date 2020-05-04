import React from 'react'
//import { Actions, Variants } from '../modules/TalkRoomMessageModule'
import TalkRoomMessageModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'

import { connect } from 'react-redux'
import { Container, Form, Row, Col } from 'react-bootstrap'
import MessageSendButton from '../components/MessageSendButton'

export class MessageFormContainer extends React.Component {

    startInputting = () => this.props.changeUserStatus({
        talkRoomId : this.props.match.params.id,
        userId : this.props.loginUser.id,
        status: '入力中'                                    
    })

    finishInputting = () => this.props.changeUserStatus({
        talkRoomId : this.props.match.params.id,
        userId : this.props.loginUser.id,
        status : ''
    })

    render() {
        return (
            <Container {...this.props}>
                <Form onSubmit={(formEvent) => {
                        formEvent.preventDefault()
                        this.props.sendMessage({
                            roomId    : this.props.match.params.id,
                            className : "myMessage",
                            text      : formEvent.currentTarget.inputMessage.value,
                            user      : this.props.loginUser
                        })
                        formEvent.currentTarget.inputMessage.value = ""
                        this.finishInputting()
                    }}>
                    <Row>
                        <Col xs={10} sm={10} md={11}>
                            <Form.Control 
                                name="inputMessage" 
                                type="text" 
                                placeholder="メッセージを入力してね" 
                                onFocus={this.startInputting}
                                onChange={this.startInputting}
                                onBlur={this.finishInputting}
                            /> 
                        </Col>
                        <Col xs={2} sm={2} md={1}>
                            <MessageSendButton />
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginUser : state.logStatus.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeUserStatus : ({
            talkRoomId,
            userId,
            status
        }) => {
            dispatch(TalkRoomMessageModule.actions.changeCurrentUserStatus({
                talkRoomId,
                userId,
                status
            }))
        },
        sendMessage:({
            roomId,
            className,
            text,
            user
        }) => {
            dispatch(TalkRoomMessageModule.actions.addMessage({
                roomId,
                className,
                text,
                user
            }))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageFormContainer)
