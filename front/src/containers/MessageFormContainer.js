import React from 'react'
//import { Actions, Variants } from '../modules/TalkRoomMessageModule'
import TalkRoomMessageModule from '../modules/talkRoomMessageModule/TalkRoomMessageModule'
import { connect } from 'react-redux'
import { Container, ButtonGroup, Form, Row, Col } from 'react-bootstrap'
import MessageSendButton from '../components/MessageSendButton'

export class MessageFormContainer extends React.Component {

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
                    }}>
                    <Row>
                        <Col xs={10} sm={10} md={11}>
                            <Form.Control name="inputMessage" type="text" placeholder="メッセージを入力してね" /> 
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
