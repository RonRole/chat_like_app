import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import MessageImageModalForm from './MessageImageModalForm'

const MessageImageButton = ({
    match
}) => {
    const [messageImageModalShow, setMessageImageModalShow] = useState(false)
    const loginUser = useSelector(state=>state.logStatus.isLoggedIn)
    const dispatch = useDispatch()

    return (
        <>
            <Button variant='primary' onClick={()=>{
                dispatch(CurrentRoomStatusModule.actions.changeCurrentUserStatus({
                    talkRoomId : match.params.id,
                    userId : loginUser.id,
                    status : '入力中'
                }))
                setMessageImageModalShow(true)
            }}>Image</Button>
            <MessageImageModalForm roomId={match.params.id} show={messageImageModalShow} onCancel={() => {
                setMessageImageModalShow(false)
                dispatch(CurrentRoomStatusModule.actions.changeCurrentUserStatus({
                    talkRoomId : match.params.id,
                    userId : loginUser.id,
                    status : ''
                }))
            }}/>
        </>
    )
}

export default withRouter(MessageImageButton)
