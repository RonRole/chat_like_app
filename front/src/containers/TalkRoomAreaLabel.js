import React from 'react'
import { useSelector } from 'react-redux'

const TalkRoomAreaLabel = {}
const OwnRoomLabel = () => {
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    return (
        <div>
            <h6 style={{borderBottom:"1px solid gray"}}>
                <strong>{loginUser.name}</strong>さんが管理しているトークルーム
            </h6>
        </div>
    )
}

const JoinRoomLabel = () => {
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    return (
        <div>
            <h6 style={{borderBottom:"1px solid gray"}}>
                <strong>{loginUser.name}</strong>さんが参加しているトークルーム
            </h6>
        </div>
    )
}

TalkRoomAreaLabel.OwnRoomLabel = OwnRoomLabel
TalkRoomAreaLabel.JoinRoomLabel = JoinRoomLabel

export default TalkRoomAreaLabel