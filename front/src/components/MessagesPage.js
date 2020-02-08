import React from 'react'
import MessagesContainer from '../containers/MessagesContainer'
import MessageFormContainer from '../containers/MessageFormContainer'
import { Container } from 'react-bootstrap'

class MessagePage extends React.Component {
    render(){
        return (
            <Container>
                <MessagesContainer />
                <MessageFormContainer/>
            </Container>
        )
    }
}

export default MessagePage