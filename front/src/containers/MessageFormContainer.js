import React from 'react'
import { Actions, Variants } from '../modules/MessageModule'
import { connect } from 'react-redux'
import { Container, Button, ButtonGroup, Form, Col, Row } from 'react-bootstrap'
import OonButton from './OonButton'
import AonButton from './AonButton'
import MessageSendButton from '../components/MessageSendButton'

class MessageFormContainer extends React.Component {

    render() {
        return (
            <Container>
                <Form onSubmit={this.props.sendMessage}>
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
        sendMessage:(formEvent) => {
            formEvent.preventDefault()
            dispatch(Actions.addMessage('warning', formEvent.currentTarget.inputMessage.value))
        }
    }
}

export default connect(null,mapDispatchToProps)(MessageFormContainer)