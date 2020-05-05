import React from 'react'
import {connect} from 'react-redux'
import { Container, Alert, Row, Col, Image } from 'react-bootstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
import UserModule from '../modules/userModule/UserModule'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'

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
        window.onbeforeunload = () => {
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
                                <div>
                                    <Image src={this.props.getUserById(message.user).image.thumb.url}/>
                                    <strong className="ml-2">{this.props.getUserById(message.user).name}</strong>
                                    <Alert 
                                        variant={this.classNameToVariant[message.className]} 
                                        key={index} 
                                        style={{
                                            overflow:"auto"
                                        }}>
                                        {message.text}
                                    </Alert>
                                </div>
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
        state,
        loginUser : state.logStatus.isLoggedIn,
        getTalkRoomById : (roomId) => TalkRoomModule.reducer.getTalkRoomById(state)(roomId),
        getMessagesByRoomId:(roomId) => CurrentRoomStatusModule.reducer.getMessagesByRoomId(state)(roomId),
        getUserById : (id) => UserModule.reducer.getUserById(state)(id)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        joinRoom:({
            user, 
            roomId
        }) => dispatch(CurrentRoomStatusModule.actions.joinRoom({user, roomId})),
        leaveRoom:({
            user,
            roomId
        }) => dispatch(CurrentRoomStatusModule.actions.leaveRoom({user, roomId})),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);

