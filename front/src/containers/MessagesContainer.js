import React from 'react'
import {connect} from 'react-redux'
import { Container, Alert } from 'react-bootstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import "./MessageContainer.css"

class MessagesContainer extends React.Component {

    componentDidUpdate(){
        const messageArea = document.getElementById("messageArea")
        messageArea.scrollTo(0, this.props.messageAreaBottom)
    }

    render() {
        return (
            <Container id = "messageArea">
                <TransitionGroup>
                    {this.props.messages.map((message,index) => {
                        return (
                            <CSSTransition key={index} timeout= {100} classNames="fade">
                                <Alert variant={message.className} key={index}>{message.text}</Alert>
                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        messageAreaBottom: state.messageAreaBottom
    }
}

export default connect(mapStateToProps, null)(MessagesContainer);

