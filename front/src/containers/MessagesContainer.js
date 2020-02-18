import React from 'react'
import {connect} from 'react-redux'
import { Container, Alert, Row, Col } from 'react-bootstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import "./MessageContainer.css"
import TalkRoomMessageModule from '../modules/talkRoomMessageModule/TalkRoomMessageModule'

export class MessagesContainer extends React.Component {
    componentDidMount(){
        this.props.joinRoom(this.props.match.params.id)
    }

    componentDidUpdate(){
        const messageArea = document.getElementById("messageArea")
        messageArea.scrollTo(0, this.props.getMessageAreaBottom(this.props.match.params.id))
    }

    render() {
        return (
            <Container id = "messageArea">
                <TransitionGroup>
                    {this.props.getMessagesByRoomId(this.props.match.params.id).map((message,index) => {
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
        getMessagesByRoomId:(roomId) => TalkRoomMessageModule.reducer.getMessagesByRoomId(state)(roomId),
        getMessageAreaBottom:(roomId) => TalkRoomMessageModule.reducer.getMessageAreaBottomById(state)(roomId)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        joinRoom:(roomId) => dispatch(TalkRoomMessageModule.actions.joinRoom({roomId:roomId}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);

