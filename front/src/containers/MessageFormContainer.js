import React from 'react'
//import { Actions, Variants } from '../modules/TalkRoomMessageModule'
import TalkRoomMessageModule from '../modules/talkRoomMessageModule/TalkRoomMessageModule'
import { connect } from 'react-redux'
import { Container, ButtonGroup, Form } from 'react-bootstrap'
import OonButton from './OonButton'
import AonButton from './AonButton'
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
                    }}>
                    <Form.Control className="mt-2 mb-2" name="inputMessage" type="text" placeholder="こ↑こ↓に書いて、どうぞ"/>    
                    <ButtonGroup aria-label="Basic example">
                        <MessageSendButton />
                    </ButtonGroup>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginUser : state.logReducer.isLoggedIn
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
                roomId    : roomId,
                className : className,
                text      : text,
                user      : user
            }))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageFormContainer)
