import React from 'react'
import {connect} from 'react-redux'
import { Container, Alert, Row, Col } from 'react-bootstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import "./MessageContainer.css"

export class MessagesContainer extends React.Component {
    componentDidUpdate(){
        const messageArea = document.getElementById("messageArea")
        messageArea.scrollTo(0, this.props.messageState[this.props.match.params.id].messageAreaBottom)
    }

    render() {
        return (
            <Container id = "messageArea">
                <TransitionGroup>
                    {this.props.messageState[this.props.match.params.id].messages   .map((message,index) => {
                        return (
                            <CSSTransition key={index} timeout= {100} classNames="fade">
                                <Row>
                                    <Col md={message.md}>
                                        <Alert variant={message.className} key={index}>{message.text}</Alert>
                                    </Col>
                                </Row>
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
        messageState : state.appReducer
    }
}

export default connect(mapStateToProps)(MessagesContainer);

