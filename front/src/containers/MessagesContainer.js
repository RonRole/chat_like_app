import React from 'react'
import {connect} from 'react-redux'
import { Container, Alert, Row, Col, Image } from 'react-bootstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import TalkRoomMessageModule from '../modules/talkRoomMessageModule/TalkRoomMessageModule'
import UserModule from '../modules/userModule/UserModule'

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
        window.onunload = () => {
            this.props.leaveRoom({
                user : this.props.loginUser,
                roomId : this.props.match.params.id
            })
        }
    }

    componentWillUnmount() {
        this.props.leaveRoom({
            user : this.props.loginUser,
            roomId : this.props.match.params.id
        })

    }   

    componentDidUpdate(){
        console.log(this.props.allState)
        const messageArea = document.getElementById("messageArea")
        messageArea.scrollTo(0, document.getElementById("messageArea").scrollHeight)
    }

    render() {
        return (
            <Container id = "messageArea" className={this.props.className} style={this.props.style}>
                <TransitionGroup>
                    {this.props.getMessagesByRoomId(this.props.match.params.id).map((message,index) => {
                        return (
                            <CSSTransition key={index} timeout= {100} classNames="fade">
                                <Row>
                                    <Col className md={message.md}>
                                        <Image src={`${process.env.REACT_APP_BACKEND_ADDRESS}/${this.props.getUserById(message.user).image.thumb.url}`}/>
                                        <Alert variant={this.classNameToVariant[message.className]} key={index} style={{overflow:"auto"}}>
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
        allState : state,
        loginUser : state.logStatus.isLoggedIn,
        getMessagesByRoomId:(roomId) => TalkRoomMessageModule.reducer.getMessagesByRoomId(state)(roomId),
        getUserById : (id) => UserModule.reducer.getUserById(state)(id)
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
        }) => dispatch(TalkRoomMessageModule.actions.leaveRoom({user: user, roomId:roomId})),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);

