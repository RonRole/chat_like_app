import React from 'react'
import MessagesContainer from './MessagesContainer'
import MessageFormContainer from './MessageFormContainer'
import { Container } from 'react-bootstrap'
import { connect, useSelector } from 'react-redux'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import UserModule from '../modules/userModule/UserModule'
import CurrentUsersContainer from './CurrentUsersContainer'
import Sidebar from '../components/Sidebar'
import { Link, withRouter } from 'react-router-dom'

const MessagesPage = ({
    match
}) => {
    const roomsStatus = useSelector(state=>state.talkRooms)
    const thisRoom = roomsStatus.ownRooms[match.params.id] || roomsStatus.joinRooms[match.params.id] || roomsStatus.default

    return (
        <>
            <Sidebar>
                <Link className='nav-link' to=''>Test</Link>
                <Link className = "nav-link" to="/talk_rooms">退出する</Link>
                <Link className = "nav-link" to="/talk_rooms">テスト</Link>
            </Sidebar>
            <Container className="justify-content-center">
                <strong>{thisRoom.title}</strong>
                <CurrentUsersContainer/>
                <MessagesContainer />
                <MessageFormContainer />
            </Container>
        </>
    )
}

export default withRouter(MessagesPage)
