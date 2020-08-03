import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import SimpleBorder from '../style-components/SimpleBorder'


const TalkRoomAreaLabel = {}
const OwnRoomLabel = () => {
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    return (
        <SimpleBorder as='h6' position='bottom'>
            <strong>{loginUser.name}</strong>さんが管理しているトークルーム
        </SimpleBorder>
    )
}

const JoinRoomLabel = () => {
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    return (
        <SimpleBorder as='h6' position='bottom'>
            <strong>{loginUser.name}</strong>さんが参加しているトークルーム
        </SimpleBorder>
    )
}

TalkRoomAreaLabel.OwnRoomLabel = OwnRoomLabel
TalkRoomAreaLabel.JoinRoomLabel = JoinRoomLabel

export default TalkRoomAreaLabel