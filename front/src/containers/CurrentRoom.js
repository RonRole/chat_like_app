import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import CurrentUsersContainer from './CurrentUsersContainer'
import CurrentMessagesContainer from './CurrentMessagesContainer'
import CurrentMessageFormContainer from './CurrentMessageFormContainer'
import CurrentUsersMapContainer from './CurrentUsersMapContainer'
import CurrentRoomUserTracer from './CurrentRoomUserTracer'
import CurrentMessageImageModalForm from './CurrentMessageImageModalForm'
import BgmModalForm from './BgmModalForm'



const CurrentRoom = ({
    talkRoomId
}) => {
    const roomsStatus = useSelector(state=>state.talkRooms)
    const thisRoom = roomsStatus.ownRooms[talkRoomId] || roomsStatus.joinRooms[talkRoomId] || roomsStatus.default
    return (
        <Row>
            <Container className='col-0 col-lg-3'>
            </Container>
            <Container className="justify-content-center m-1 m-sm-0 col-lg-6">
                <strong>{thisRoom.title}</strong>
                <CurrentUsersContainer talkRoomId = {talkRoomId}/>
                <CurrentMessagesContainer talkRoomId = {talkRoomId} />
                <CurrentMessageFormContainer talkRoomId = {talkRoomId}/>
                <CurrentMessageImageModalForm.ShowButton className='mr-2 d-none d-sm-inline' talkRoomId = {talkRoomId} />
                <BgmModalForm.ShowButton className='d-none d-sm-inline' talkRoomId = {talkRoomId} />
            </Container>
            <Container className='col-0 col-lg-3 d-none d-lg-block'>
                <CurrentUsersMapContainer talkRoomId={talkRoomId} />
                <CurrentRoomUserTracer talkRoomId={talkRoomId}/>
            </Container>
        </Row>
    )
}

export default CurrentRoom