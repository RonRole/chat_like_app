import React from 'react'
import Sidebar from './Sidebar'
import { Link, withRouter } from 'react-router-dom'
import CurrentRoom from '../containers/CurrentRoom'

const MessagesPage = ({
    match
}) => {
    return (
        <>
            <Sidebar>
                <Link className='nav-link' to=''>Test</Link>
                <Link className = "nav-link" to="/talk_rooms">退出する</Link>
                <Link className = "nav-link" to="/talk_rooms">テスト</Link>
            </Sidebar>
            <CurrentRoom talkRoomId={match.params.id} />
        </>
    )
}

export default withRouter(MessagesPage)
