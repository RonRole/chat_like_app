import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, ButtonGroup, ToggleButtonGroup } from 'react-bootstrap'
import CurrentUsersContainer from './CurrentUsersContainer'
import CurrentMessagesContainer from './CurrentMessagesContainer'
import CurrentMessageFormContainer from './CurrentMessageFormContainer'
import CurrentUsersMapContainer from './CurrentUsersMapContainer'
import CurrentRoomUserTracer from './CurrentRoomUserTracer'
import MessageImageModalForm from './MessageImageModalForm'
import BgmModalForm from './BgmModalForm'
import UserMonitorContainer from './UserMonitorContainer'

const UserActivityContainer = ({
    ...props
}) => {
    return (
        <Container {...props}>
            <h6 className='ml-5'><strong>最近のアクティビティ</strong></h6>
            <UserMonitorContainer className='ml-4 vh-80 overflow-auto'/>
        </Container>
    )
}

const CurrnetRoomContainer = ({
    talkRoomId,
    ...props
}) => {
    const roomsStatus = useSelector(state=>state.talkRooms)
    const thisRoom = roomsStatus.ownRooms[talkRoomId] || roomsStatus.joinRooms[talkRoomId] || roomsStatus.default
    return (
        <Container {...props}>
            <strong>{thisRoom.title}</strong>
            <CurrentUsersContainer talkRoomId = {talkRoomId} className='simple-border mb-2 h-user-thumb'/>
            <div className='h-100per-minus-user-thumb' >
                <CurrentMessagesContainer talkRoomId = {talkRoomId} className='mb-2 pb-4 simple-border overflow-auto h-per-80 bg-sawai'/>
                <div className='h-per-20'>
                    <CurrentMessageFormContainer talkRoomId = {talkRoomId}/>
                    <MessageImageModalForm.ShowButton className='mr-2 d-none d-md-inline' talkRoomId = {talkRoomId} />
                    <BgmModalForm.ShowButton className='d-none d-md-inline' talkRoomId = {talkRoomId} />
                </div>
            </div>
        </Container>
    )
}

const UserMapContainer = ({
    talkRoomId,
    ...props
}) => {
    return (
        <Container {...props}>
            <CurrentUsersMapContainer talkRoomId={talkRoomId} />
            <CurrentRoomUserTracer talkRoomId={talkRoomId}/>
        </Container>
    )
}


const CurrentRoom = ({
    talkRoomId
}) => {
    return (
        <Row className='justify-content-center'>
            <UserActivityContainer talkRoomId={talkRoomId} className='col-0 col-sm-3 d-none d-lg-block' />
            <CurrnetRoomContainer talkRoomId={talkRoomId} className="justify-content-center m-1 m-sm-0 col-lg-6 vh-80" />
            <UserMapContainer talkRoomId={talkRoomId} className='col-0 col-sm-3 d-none d-lg-block vh-80 overflow-auto' />
        </Row>
    )
}

export default CurrentRoom