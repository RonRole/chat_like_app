import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Container, Fade} from 'react-bootstrap'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
import UserMessage from '../components/UserMessage'
import styled from 'styled-components'
import FadeIn from '../style-components/FadeIn'


const MessageContainerLifeCycleEffect= ({
    talkRoomId
}) => {
    const dispatch = useDispatch()
    const loginUser = useSelector(state => state.logStatus.loginUser)
    useEffect(() => {
        dispatch(CurrentRoomStatusModule.actions.joinRoom({
            user : loginUser,
            roomId : talkRoomId,
            messageType : 'text',
            messageClass:'joinRoom',
            text : `${loginUser.name}さんが参加しました`
        }))
        window.onbeforeunload = () => {
            dispatch(CurrentRoomStatusModule.actions.leaveRoom({
                user : loginUser,
                roomId : talkRoomId,
                messageType:'text',
                messageClass:'leaveRoom',
                text : `${loginUser.name}さんが退出しました`
            }))
        }
        return ()　=> {
            dispatch(CurrentRoomStatusModule.actions.leaveRoom({
                user : loginUser,
                roomId : talkRoomId,
                messageType:'text',
                messageClass:'leaveRoom',
                text : `${loginUser.name}さんが退出しました`
            }))
        }
    }, [talkRoomId])
}

const MessagesContainer = ({
    talkRoomId,
    ...props
}) => {
    const users = useSelector(state => state.users)
    const currentRoomStatus = useSelector(state => state.currentRoomStatus)
    const messages = (currentRoomStatus[talkRoomId] || currentRoomStatus.default).messages
    const messageArea = useRef(null)
    useEffect(() => {
        messageArea.current.scroll(0, messageArea.current.scrollHeight)
    }, [messages])
    MessageContainerLifeCycleEffect({talkRoomId})
    return (
        <Container ref={messageArea} {...props}>
            {[messages].flat().filter(message=>message).map((message,index) => {
                const userId = message.userId || 0
                const userMessageProps = {
                    userName : (users[userId] || users.default).name,
                    userImageUrl : (users[userId] || users.default).image.thumb.url,
                    ...message
                }
                return (
                    <FadeIn key={index} duration={0.2}>
                        <UserMessage {...userMessageProps}/>
                    </FadeIn>
                )
            })}
        </Container>
    )
}

const StyledMessagesContainer = styled(MessagesContainer)`
    height:${props=>props.height};
    width:${props=>props.width};
    border: 1px solid gray;
`

export default StyledMessagesContainer
