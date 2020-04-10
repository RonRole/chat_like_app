import React from 'react'
//import { Actions, Variants } from '../modules/TalkRoomMessageModule'
import TalkRoomMessageModule from '../modules/talkRoomMessageModule/TalkRoomMessageModule'
import { connect } from 'react-redux'
import { Container, ButtonGroup, Form } from 'react-bootstrap'
import MessageSendButton from '../components/MessageSendButton'

export class MessageFormContainer extends React.Component {

    render() {
        return (
            <Container>
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
                    <Form.Control className="mt-2 mb-2" name="inputMessage" type="text" placeholder="メッセージを入力してね"/>    
                    <MessageSendButton />
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
