import React from 'react'
import {connect} from 'react-redux'
import { Container, Alert, Row, Col } from 'react-bootstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import "./MessageContainer.css"
import TalkRoomMessageModule from '../modules/talkRoomMessageModule/TalkRoomMessageModule'

export class MessagesContainer extends React.Component {

    classNameToVariant = {
        "joinRoom" : "primary",
        "leaveRoom" : "danger",
        "myMessage" : "success",
        "receiveMessage" : "secondary"
    }

    componentDidMount(){
        this.props.joinRoom({
            user : this.props.loginUser,
            roomId: this.props.match.params.id
        })
    }

    componentWillUnmount() {
        this.props.leaveRoom({
            user : this.props.loginUser,
            roomId : this.props.match.params.id
        })
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
                        console.log(message)
                        return (
                            <CSSTransition key={index} timeout= {100} classNames="fade">
                                <Row>
                                    <Col className md={message.md}>
                                        <img src={`${process.env.REACT_APP_BACKEND_ADDRESS}/${message.user.image.thumb.url}`}/>
                                        <Alert variant={this.classNameToVariant[message.className]} key={index}>
                                            {message.text}
                                        </Alert>
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
        loginUser : state.logReducer.isLoggedIn,
        getMessagesByRoomId:(roomId) => TalkRoomMessageModule.reducer.getMessagesByRoomId(state)(roomId),
        getMessageAreaBottom:(roomId) => TalkRoomMessageModule.reducer.getMessageAreaBottomById(state)(roomId)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        joinRoom:({
            user, 
            roomId
        }) => dispatch(TalkRoomMessageModule.actions.joinRoom({user: user, roomId:roomId})),
        leaveRoom:({
            user,
            roomId
        }) => dispatch(TalkRoomMessageModule.actions.leaveRoom({user: user, roomId:roomId}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);

