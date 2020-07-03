import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Link, withRouter } from 'react-router-dom'
import CurrentRoom from '../containers/CurrentRoom'
import CurrentRoomTranslateModal from '../containers/CurrentRoomTranslateModal'

const MessagesPage = ({
    match
}) => {
    return (
        <>
            <Sidebar>
                <Link className = "nav-link" to="/talk_rooms">退出する</Link>
                <CurrentRoomTranslateModal.ShowLink talkRoomId={match.params.id} />
            </Sidebar>
            <CurrentRoom talkRoomId={match.params.id} />
        </>
    )
}

export default withRouter(MessagesPage)
