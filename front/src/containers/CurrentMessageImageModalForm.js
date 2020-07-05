import React, { useState } from 'react'
import ModalForm from '../components/ModalForm'
import { Modal, Button, Form, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MessageImageModule from '../modules/messageImageModule/MessageImageModule'
import SendMessageImageField from './MessageImageSendField'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'
import { Link } from 'react-router-dom'

const UploadMessageImageFormGroup = () => {
    const dispatch = useDispatch()
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    return (
        <Form.Group>
            <Form.Control 
                className='invisible position-absolute' 
                id='messageImageUploadForm' 
                type='file' 
                name='message_image'
                onChange={(e) => {
                    dispatch(MessageImageModule.actions.execUploadMessageImage({
                        userId:loginUser.id,
                        messageImageParams: {
                            src:e.currentTarget.files[0]
                        }
                    }))
                }}
            />
            <Button className='ml-2' variant='primary' onClick={() => {
                document.getElementById('messageImageUploadForm').click()
            }}>新しい画像をアップロードする</Button>
        </Form.Group>
    )
}

const CurrentMessageImageModalForm = ({
    show,
    talkRoomId,
    onCancel
}) => {
    return (
        <Modal show={show}>
            <Modal.Header>
                <h6><strong>画像を選択してください</strong></h6>
            </Modal.Header>
            <Modal.Body className="d-flex row m-2 overflow-scroll">
                <SendMessageImageField talkRoomId={talkRoomId}/>
            </Modal.Body>
            <Modal.Footer>
                <UploadMessageImageFormGroup />
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
CurrentMessageImageModalForm.ShowButton = ShowButton

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
CurrentMessageImageModalForm.ShowLink = ShowLink


export default CurrentMessageImageModalForm