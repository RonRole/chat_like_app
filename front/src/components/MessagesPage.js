import React from 'react'
import MessagesContainer from '../containers/MessagesContainer'
import MessageButtonContainer from '../containers/MessageButtonContainer'
import { Container } from 'react-bootstrap'

class MessagePage extends React.Component {
    render(){
        return (
            <Container>
                <MessagesContainer />
                <MessageButtonContainer/>
            </Container>
        )
    }
}

export default MessagePage