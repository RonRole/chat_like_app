import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import CurrentUsersContainer from './CurrentUsersContainer'
import CurrentMessagesContainer from './CurrentMessagesContainer'
import CurrentMessageFormContainer from './CurrentMessageFormContainer'
import CurrentMessageImageFormShowButton from './CurrentMessageImageFormShowButton'

const CurrentRoom = ({
    talkRoomId
}) => {
    const roomsStatus = useSelector(state=>state.talkRooms)
    const thisRoom = roomsStatus.ownRooms[talkRoomId] || roomsStatus.joinRooms[talkRoomId] || roomsStatus.default
    return (
        <Container className="justify-content-center pl-5 pl-sm-0">
            <strong>{thisRoom.title}</strong>
            <CurrentUsersContainer talkRoomId = {talkRoomId}/>
            <CurrentMessagesContainer talkRoomId = {talkRoomId} />
            <CurrentMessageFormContainer talkRoomId = {talkRoomId}/>
            <CurrentMessageImageFormShowButton talkRoomId = {talkRoomId} />
        </Container>
    )
}

export default CurrentRoom