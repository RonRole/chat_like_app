import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Link, withRouter } from 'react-router-dom'
import CurrentRoom from '../containers/CurrentRoom'
import CurrentRoomTranslateModal from '../containers/CurrentRoomTranslateModal'
import BgmModalForm from '../containers/BgmModalForm'
import CurrentMessageImageModalForm from '../containers/MessageImageModalForm'

const MessagesPage = ({
    match,
    ...props
}) => {
    return (
        <div {...props}>
            <Sidebar className='d-none d-lg-block'>
                <Link className = "nav-link" to="/talk_rooms">退出する</Link>
                <CurrentRoomTranslateModal.ShowLink talkRoomId={match.params.id} />
                <BgmModalForm.ShowLink　talkRoomId={match.params.id} className='nav-link d-md-none' to='#'>
                    BGM変更
                </BgmModalForm.ShowLink>
                <CurrentMessageImageModalForm.ShowLink talkRoomId={match.params.id} className='nav-link d-md-none' to='#'>
                    画像メッセージ送信
                </CurrentMessageImageModalForm.ShowLink>
            </Sidebar>
            <Sidebar.Small className='d-block d-lg-none'>
                <Link className = "nav-link" to="/talk_rooms">退出する</Link>
                <CurrentRoomTranslateModal.ShowLink talkRoomId={match.params.id} />
                <BgmModalForm.ShowLink　talkRoomId={match.params.id} className='nav-link d-md-none' to='#'>
                    BGM変更
                </BgmModalForm.ShowLink>
                <CurrentMessageImageModalForm.ShowLink talkRoomId={match.params.id} className='nav-link d-md-none' to='#'>
                    画像メッセージ送信
                </CurrentMessageImageModalForm.ShowLink>
            </Sidebar.Small>
            <CurrentRoom talkRoomId={match.params.id} />
        </div>
    )
}

export default withRouter(MessagesPage)
