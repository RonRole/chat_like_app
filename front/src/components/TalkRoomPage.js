import React, { useState } from 'react'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { connect } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import CreateTalkRoomForm from '../containers/CreateTalkRoomForm'



import TalkRoomsArea from '../containers/TalkRoomsArea'
import TalkRoomAreaLabel from '../containers/TalkRoomAreaLabel'
import RenderByCondition from './RenderByCondition'


const TalkRoomPage = () => {
    const [createModalShow, changeCreateModalShow] = useState(false);
    const [isOwnRoom, setOwnRoom] = useState(true)
    return (
        <Container>
            <Button className='mr-2' size='sm' disabled={isOwnRoom} onClick={() => setOwnRoom(true)}>管理ルーム</Button>
            <Button className='mr-2' size='sm' disabled={!isOwnRoom} onClick={()=>setOwnRoom(false)}>参加ルーム</Button>
            <RenderByCondition renderCondition={isOwnRoom}>
                <TalkRoomAreaLabel.OwnRoomLabel />
                <Button variant="primary" className='mb-2' onClick={() => changeCreateModalShow(true)}>トークルームを追加</Button>
                <TalkRoomsArea.OwnRoomsArea className='d-md-none' itemLengthPerPage={3} />
                <TalkRoomsArea.OwnRoomsArea className='d-none d-md-block' itemLengthPerPage={6} />
                <CreateTalkRoomForm show={createModalShow} 
                                toCloseModalAction ={()=> {
                                    changeCreateModalShow(false)
                                }}/>
            </RenderByCondition>
            <RenderByCondition renderCondition={!isOwnRoom}>
                <TalkRoomAreaLabel.JoinRoomLabel />
                <TalkRoomsArea.JoinRoomsArea className='d-md-none' itemLengthPerPage={3} />
                <TalkRoomsArea.JoinRoomsArea className='d-none d-md-block' itemLengthPerPage={6} />
            </RenderByCondition>
        </Container>
    )
}

export default TalkRoomPage