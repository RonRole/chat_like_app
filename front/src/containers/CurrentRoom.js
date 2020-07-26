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
import styled from 'styled-components'
import Size from '../style-components/Size'

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

const CurrnetRoomContainer = styled(({
    talkRoomId,
    ...props
}) => {
    const roomsStatus = useSelector(state=>state.talkRooms)
    const thisRoom = roomsStatus.ownRooms[talkRoomId] || roomsStatus.joinRooms[talkRoomId] || roomsStatus.default
    return (
        <Container {...props}>
            <strong>{thisRoom.title}</strong>
            <CurrentUsersContainer talkRoomId = {talkRoomId} className='mb-2' height='2.7rem' />
            <Size height='calc(100% - 3.0rem)'>
                <CurrentMessagesContainer talkRoomId = {talkRoomId} className='mb-2 pb-4 simple-border overflow-auto' height='80%'/>
                <Size height='20%'>
                    <CurrentMessageFormContainer talkRoomId = {talkRoomId}/>
                    <MessageImageModalForm.ShowButton className='mr-2 d-none d-md-inline' talkRoomId = {talkRoomId} />
                    <BgmModalForm.ShowButton className='d-none d-md-inline' talkRoomId = {talkRoomId} />
                </Size>
            </Size>
        </Container>
    )
})`
    height:${props=>props.height};
`


const UserMapContainer = styled(({
    talkRoomId,
    ...props
}) => {
    return (
        <Container {...props}>
            <CurrentUsersMapContainer talkRoomId={talkRoomId} />
            <CurrentRoomUserTracer talkRoomId={talkRoomId}/>
        </Container>
    )
})`
    height:${props=>props.height};
    width:${props=>props.width};
`

const CurrentRoom = ({
    talkRoomId
}) => {
    return (
        <Row className='justify-content-center m-0'>
            <UserActivityContainer talkRoomId={talkRoomId} height='80vh' className='col-0 col-sm-3 d-none d-lg-block' />
            <CurrnetRoomContainer talkRoomId={talkRoomId} height='80vh' className="m-1 m-sm-0 col-lg-6" />
            <UserMapContainer talkRoomId={talkRoomId} height='80vh' className='col-0 col-sm-3 d-none d-lg-block' />
        </Row>
    )
}

export default CurrentRoom