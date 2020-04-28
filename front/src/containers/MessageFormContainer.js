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
                        <Col xs={8} sm={9} md={10}>
                            <Form.Control name="inputMessage" type="text" placeholder="メッセージを入力してね" /> 
                        </Col>
                        <Col xs={4} sm={3} md={2}>
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
