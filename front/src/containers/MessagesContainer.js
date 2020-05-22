import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Container} from 'react-bootstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
import { withRouter } from 'react-router-dom'
import Message from '../components/UserMessage'

const MessagesContainer = ({
    match
}) => {
    const classNameToVariant = {
        "joinRoom" : "primary",
        "leaveRoom" : "danger",
        "myMessage" : "success",
        "receiveMessage" : "secondary"
    }
    const dispatch = useDispatch()
    const loginUser = useSelector(state => state.logStatus.isLoggedIn)
    const users = useSelector(state => state.users)
    const currentRoomStatus = useSelector(state => state.currentRoomStatus)
    const messages = (currentRoomStatus[match.params.id] || currentRoomStatus.default).messages

    useEffect(() => {
        dispatch(CurrentRoomStatusModule.actions.joinRoom({
            user : loginUser,
            roomId : match.params.id
        }))
        window.onbeforeunload = () => {
            dispatch(CurrentRoomStatusModule.actions.leaveRoom({
                user : loginUser,
                roomId : match.params.id
            }))
        }
        return () => dispatch(CurrentRoomStatusModule.actions.leaveRoom({
            user : loginUser,
            roomId : match.params.id
        }))
    }, [])
    useEffect(() => {
        const messageArea = document.getElementById("messagesContainer")
        messageArea.scroll(0, document.getElementById("messagesContainer").scrollHeight)
    }, [messages])

    return (
        <Container id = "messagesContainer" className='mb-2 pb-4'>
            <TransitionGroup>
                {[messages].flat().filter(message=>message).map((message,index) => {
                    return (
                        <CSSTransition key={index} timeout= {100} classNames="fade">
                            <Message userName={(users[message.userId] || users[0]).name} 
                                    userImageUrl={(users[message.userId] || users[0]).image.thumb.url} 
                                    text={message.text} 
                                    variant={classNameToVariant[message.className]} 
                            />
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        </Container>
    )
}

export default withRouter(MessagesContainer)
