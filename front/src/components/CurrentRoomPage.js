import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Link, withRouter } from 'react-router-dom'
import CurrentRoom from '../containers/CurrentRoom'
import CurrentRoomTranslateModal from '../containers/CurrentRoomTranslateModal'

const MessagesPage = ({
    match
}) => {
    const [translateModalShow, setTranslateModalShow] = useState(false) 
    return (
        <>
            <Sidebar>
                <Link className = "nav-link" to="/talk_rooms">退出する</Link>
                <Link className = 'nav-link' to='#' onClick ={() => setTranslateModalShow(true)}>翻訳モード変更</Link>
            </Sidebar>
            <CurrentRoom talkRoomId={match.params.id} />
            <CurrentRoomTranslateModal show = {translateModalShow} talkRoomId={match.params.id} onCancel = {() => setTranslateModalShow(false)} />
        </>
    )
}

export default withRouter(MessagesPage)
