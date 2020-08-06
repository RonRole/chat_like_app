import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import CurrentRoom from '../containers/CurrentRoom'
import CurrentRoomTranslateModal from '../containers/CurrentRoomTranslateModal'
import BgmModalForm from '../containers/BgmModalForm'
import MessageImageModalForm from '../containers/MessageImageModalForm'
import Sidebar from './Sidebar'

const MessagesPage = ({
    match,
    ...props
}) => {
    return (
        <div>
            <Sidebar className='d-none d-md-flex'>
                <Link className = "nav-link" to="/talk_rooms">退出する</Link>
                <BgmModalForm.ShowLink　talkRoomId={match.params.id} className='nav-link d-md-none' to='#'>
                    BGM変更
                </BgmModalForm.ShowLink>
                <MessageImageModalForm.ShowLink talkRoomId={match.params.id} className='nav-link d-md-none' to='#'>
                    画像メッセージ送信
                </MessageImageModalForm.ShowLink>
            </Sidebar>
            <Sidebar className='d-md-none' small>
                <Link className = "nav-link" to="/talk_rooms">退出する</Link>
                <BgmModalForm.ShowLink　talkRoomId={match.params.id} className='nav-link d-md-none' to='#'>
                    BGM変更
                </BgmModalForm.ShowLink>
                <MessageImageModalForm.ShowLink talkRoomId={match.params.id} className='nav-link d-md-none' to='#'>
                    画像メッセージ送信
                </MessageImageModalForm.ShowLink>
            </Sidebar>
            <CurrentRoom talkRoomId={match.params.id} />
        </div>
    )
}

export default withRouter(MessagesPage)
