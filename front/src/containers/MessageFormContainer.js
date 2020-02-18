import React from 'react'
import { Actions, Variants } from '../modules/TalkRoomMessageModule'
import { connect } from 'react-redux'
import { Container, Button, ButtonGroup, Form, Col, Row } from 'react-bootstrap'
import OonButton from './OonButton'
import AonButton from './AonButton'
import MessageSendButton from '../components/MessageSendButton'

export class MessageFormContainer extends React.Component {

    render() {
        return (
            <Container>
                <Form onSubmit={(formEvent) => {
                        formEvent.preventDefault()
                        this.props.sendMessage(
                            this.props.match.params.id,
                            formEvent.currentTarget.inputMessage.value
                        )
                    }}>
                    <Form.Control className="mt-2 mb-2" name="inputMessage" type="text" placeholder="こ↑こ↓に書いて、どうぞ"/>    
                    <ButtonGroup aria-label="Basic example">
                        <OonButton />
                        <AonButton />
                        <MessageSendButton />
                    </ButtonGroup>
                </Form>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage:(roomId, message) => {
            dispatch(Actions.addMessage({
                roomId   :roomId,
                className:'warning', 
                text     :message
            }))
        }
    }
}

export default connect(null,mapDispatchToProps)(MessageFormContainer)
