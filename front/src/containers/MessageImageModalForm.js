import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MessageImageModule from '../modules/messageImageModule/MessageImageModule'
import SendMessageImageField from './MessageImageSendField'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
import { Link } from 'react-router-dom'
import MessageImageUploadFormGroup from './MessageImageUploadFormGroup'

const MessageImageModalForm = ({
    talkRoomId,
    onCancel,
    ...props
}) => {
    return (
        <Modal {...props}>
            <Modal.Header>
                <h6><strong>画像を選択してください</strong></h6>
            </Modal.Header>
            <Modal.Body className="d-flex row m-2 overflow-scroll">
                <SendMessageImageField talkRoomId={talkRoomId}/>
            </Modal.Body>
            <Modal.Footer>
                <MessageImageUploadFormGroup />
                <Button className='ml-2' variant='secondary'　onClick={onCancel}>やめる</Button>
            </Modal.Footer>
        </Modal>
    )
}

const ShowButton = ({
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
            <MessageImageModalForm scrollable talkRoomId={talkRoomId} show={messageImageModalShow} onCancel={() => {
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
MessageImageModalForm.ShowButton = ShowButton

const ShowLink = ({
    talkRoomId,
    ...props
}) => {
    const [messageImageModalShow, setMessageImageModalShow] = useState(false)
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    const dispatch = useDispatch()

    return (
        <>
            <Link {...props} onClick={()=>{
                dispatch(CurrentRoomStatusModule.actions.changeCurrentUserStatus({
                    talkRoomId,
                    userId : loginUser.id,
                    status : '🖼'
                }))
                setMessageImageModalShow(true)
            }} />
            <MessageImageModalForm scrollable talkRoomId={talkRoomId} show={messageImageModalShow} onCancel={() => {
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
MessageImageModalForm.ShowLink = ShowLink


export default MessageImageModalForm