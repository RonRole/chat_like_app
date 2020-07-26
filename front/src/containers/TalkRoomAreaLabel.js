import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const LabelBorder = styled.h6`
    border-bottom:1px solid gray;
`

const TalkRoomAreaLabel = {}
const OwnRoomLabel = () => {
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    return (
        <LabelBorder>
            <strong>{loginUser.name}</strong>さんが管理しているトークルーム
        </LabelBorder>
    )
}

const JoinRoomLabel = () => {
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    return (
        <LabelBorder>
            <strong>{loginUser.name}</strong>さんが参加しているトークルーム
        </LabelBorder>
    )
}

TalkRoomAreaLabel.OwnRoomLabel = OwnRoomLabel
TalkRoomAreaLabel.JoinRoomLabel = JoinRoomLabel

export default TalkRoomAreaLabel