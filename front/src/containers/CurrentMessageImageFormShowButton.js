import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
import { Button } from 'react-bootstrap'
import CurrentMessageImageModalForm from './CurrentMessageImageModalForm'

const CurrentMessageImageFormShowButton = ({
    talkRoomId,
    className
}) => {
    const [messageImageModalShow, setMessageImageModalShow] = useState(false)
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    const dispatch = useDispatch()

    return (
        <>
            <Button variant='primary' className={className} onClick={()=>{
                dispatch(CurrentRoomStatusModule.actions.changeCurrentUserStatus({
                    talkRoomId,
                    userId : loginUser.id,
                    status : '🖼'
                }))
                setMessageImageModalShow(true)
            }}>Image</Button>
            <CurrentMessageImageModalForm  talkRoomId={talkRoomId} show={messageImageModalShow} onCancel={() => {
                setMessageImageModalShow(false)
                dispatch(CurrentRoomStatusModule.actions.changeCurrentUserStatus({
                    talkRoomId,
                    userId : loginUser.id,
                    status : ''
                }))
            }}/>
        </>
    )
}

export default CurrentMessageImageFormShowButton
