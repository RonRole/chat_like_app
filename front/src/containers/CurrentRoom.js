import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import CurrentUsersContainer from './CurrentUsersContainer'
import CurrentMessagesContainer from './CurrentMessagesContainer'
import CurrentMessageFormContainer from './CurrentMessageFormContainer'

const CurrentRoom = ({
    talkRoomId
}) => {
    const roomsStatus = useSelector(state=>state.talkRooms)
    const thisRoom = roomsStatus.ownRooms[talkRoomId] || roomsStatus.joinRooms[talkRoomId] || roomsStatus.default
    return (
        <Container className="justify-content-center">
            <strong>{thisRoom.title}</strong>
            <CurrentUsersContainer/>
            <CurrentMessagesContainer />
            <CurrentMessageFormContainer />
        </Container>
    )
}

export default CurrentRoom