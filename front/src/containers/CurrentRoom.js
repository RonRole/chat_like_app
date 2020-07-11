import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import CurrentUsersContainer from './CurrentUsersContainer'
import CurrentMessagesContainer from './CurrentMessagesContainer'
import CurrentMessageFormContainer from './CurrentMessageFormContainer'
import CurrentUsersMapContainer from './CurrentUsersMapContainer'
import CurrentRoomUserTracer from './CurrentRoomUserTracer'
import MessageImageModalForm from './MessageImageModalForm'
import BgmModalForm from './BgmModalForm'
import UserMonitorContainer from './UserMonitorContainer'



const CurrentRoom = ({
    talkRoomId
}) => {
    const roomsStatus = useSelector(state=>state.talkRooms)
    const thisRoom = roomsStatus.ownRooms[talkRoomId] || roomsStatus.joinRooms[talkRoomId] || roomsStatus.default
    return (
        <Row className='justify-content-center'>
            <Container className='col-0 col-sm-3 d-none d-lg-block'>
                <h6 className='ml-5'><strong>最近のアクティビティ</strong></h6>
                <UserMonitorContainer className='ml-4 user-monitor-container'/>
            </Container>
            <Container className="justify-content-center m-1 m-sm-0 col-lg-6">
                <strong>{thisRoom.title}</strong>
                <CurrentUsersContainer talkRoomId = {talkRoomId}/>
                <CurrentMessagesContainer talkRoomId = {talkRoomId} />
                <CurrentMessageFormContainer talkRoomId = {talkRoomId}/>
                <MessageImageModalForm.ShowButton className='mr-2 d-none d-md-inline' talkRoomId = {talkRoomId} />
                <BgmModalForm.ShowButton className='d-none d-md-inline' talkRoomId = {talkRoomId} />
            </Container>
            <Container className='col-0 col-sm-3 d-none d-lg-block'>
                <CurrentUsersMapContainer talkRoomId={talkRoomId} />
                <CurrentRoomUserTracer talkRoomId={talkRoomId}/>
            </Container>
        </Row>
    )
}

export default CurrentRoom