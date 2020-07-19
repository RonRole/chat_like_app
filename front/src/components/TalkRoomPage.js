import React, { useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import CreateTalkRoomForm from '../containers/CreateTalkRoomForm'
import TalkRoomsArea from '../containers/TalkRoomsArea'
import TalkRoomAreaLabel from '../containers/TalkRoomAreaLabel'
import RenderByCondition from './RenderByCondition'


const TalkRoomPage = ({
    ...props
}) => {
    const [isOwnRoom, setOwnRoom] = useState(true)
    return (
        <Container {...props}>
            <Button className='mr-2' size='sm' disabled={isOwnRoom} onClick={() => setOwnRoom(true)}>管理ルーム</Button>
            <Button className='mr-2' size='sm' disabled={!isOwnRoom} onClick={()=>setOwnRoom(false)}>参加ルーム</Button>
            <TalkRoomPage.Own renderCondition={isOwnRoom} />
            <TalkRoomPage.Join renderCondition = {!isOwnRoom} />
        </Container>
    )
}

const Own = ({
    renderCondition
}) => {
    const [createModalShow, changeCreateModalShow] = useState(false);
    return (
        <RenderByCondition renderCondition={renderCondition}>
            <TalkRoomAreaLabel.OwnRoomLabel />
            <CreateTalkRoomForm.ShowIcon className='text-success' />
            <TalkRoomsArea.OwnRoomsArea className='d-md-none' itemLengthPerPage={2} />
            <TalkRoomsArea.OwnRoomsArea className='d-none d-md-block d-lg-none' itemLengthPerPage={3} />
            <TalkRoomsArea.OwnRoomsArea className='d-none d-lg-block' itemLengthPerPage={4} />
            <CreateTalkRoomForm show={createModalShow} onHide ={()=> {changeCreateModalShow(false)}}/>
        </RenderByCondition>
    )
}
TalkRoomPage.Own = Own

const Join = ({
    renderCondition 
}) => {
    return (
        <RenderByCondition renderCondition={renderCondition}>
            <TalkRoomAreaLabel.JoinRoomLabel />
            <TalkRoomsArea.JoinRoomsArea className='d-md-none' itemLengthPerPage={2} />
            <TalkRoomsArea.JoinRoomsArea className='d-none d-md-block d-lg-none' itemLengthPerPage={3} />
            <TalkRoomsArea.JoinRoomsArea className='d-none d-lg-block' itemLengthPerPage={4} />
        </RenderByCondition>
    )
}
TalkRoomPage.Join = Join

export default TalkRoomPage