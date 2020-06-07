import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Container} from 'react-bootstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
import { withRouter } from 'react-router-dom'
import UserMessage from '../components/UserMessage'

const MessagesContainer = ({
    talkRoomId
}) => {
    const dispatch = useDispatch()
    const loginUser = useSelector(state => state.logStatus.isLoggedIn)
    const users = useSelector(state => state.users)
    const currentRoomStatus = useSelector(state => state.currentRoomStatus)
    const messages = (currentRoomStatus[talkRoomId] || currentRoomStatus.default).messages

    useEffect(() => {
        dispatch(CurrentRoomStatusModule.actions.joinRoom({
            user : loginUser,
            roomId : talkRoomId,
            text: `${loginUser.name}が参加しました`
        }))
        window.onbeforeunload = () => {
            dispatch(CurrentRoomStatusModule.actions.leaveRoom({
                user : loginUser,
                roomId : talkRoomId,
                text:`${loginUser.name}が退出しました`
            }))
        }
        return () => dispatch(CurrentRoomStatusModule.actions.leaveRoom({
            user : loginUser,
            roomId : talkRoomId
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
                            <UserMessage
                                userName={(users[message.userId] || users[0]).name} 
                                userImageUrl={(users[message.userId] || users[0]).image.thumb.url} 
                                text={message.text} 
                                messageType={message.className}
                            />
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        </Container>
    )
}

export default MessagesContainer
