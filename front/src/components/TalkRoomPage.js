import React, { useState, useRef } from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import CreateTalkRoomForm from '../containers/CreateTalkRoomForm'
import TalkRoomsArea from '../containers/TalkRoomsArea'
import TalkRoomAreaLabel from '../containers/TalkRoomAreaLabel'
import RenderByCondition from './RenderByCondition'
import TalkRoomSearchForm from '../containers/TalkRoomSearchForm'


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
            <div className='d-flex'>
                <CreateTalkRoomForm.ShowIcon size='2.0rem' className='text-success' />    
                <TalkRoomSearchForm.Own className='d-flex' />
            </div>
            <TalkRoomsArea.OwnRoomsArea className='d-sm-none' itemLengthPerPage={1} />
            <TalkRoomsArea.OwnRoomsArea className='d-none d-sm-block d-md-none' itemLengthPerPage={2} />
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
            <TalkRoomSearchForm.Join className='d-flex' />
            <TalkRoomsArea.JoinRoomsArea className='d-sm-none' itemLengthPerPage={1} />
            <TalkRoomsArea.JoinRoomsArea className='d-none d-sm-block d-md-none' itemLengthPerPage={2} />
            <TalkRoomsArea.JoinRoomsArea className='d-none d-md-block d-lg-none' itemLengthPerPage={3} />
            <TalkRoomsArea.JoinRoomsArea className='d-none d-lg-block' itemLengthPerPage={4} />
        </RenderByCondition>
    )
}
TalkRoomPage.Join = Join

export default TalkRoomPage