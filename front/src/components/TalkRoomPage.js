import React, { useState } from 'react'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { connect } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import CreateTalkRoomForm from '../containers/CreateTalkRoomForm'



import TalkRoomsArea from '../containers/TalkRoomsArea'
import TalkRoomAreaLabel from '../containers/TalkRoomAreaLabel'
import { withRouter } from 'react-router-dom'


const TalkRoomPage = ({
    match
}) => {
    const [createModalShow, changeCreateModalShow] = useState(false);
    return (
        <Container>
            <TalkRoomAreaLabel.OwnRoomLabel />
            <Button variant="primary" className='mb-2' onClick={() => changeCreateModalShow(true)}>トークルームを追加</Button>
            <TalkRoomsArea.OwnRoomsArea itemLengthPerPage={3} />
            <TalkRoomAreaLabel.JoinRoomLabel />
            <TalkRoomsArea.JoinRoomsArea itemLengthPerPage={3} />
            <CreateTalkRoomForm show={createModalShow} 
                                toCloseModalAction ={()=> {
                                    changeCreateModalShow(false)
                                }}/>
        </Container>
    )
}

export default withRouter(TalkRoomPage)