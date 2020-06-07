import React from 'react'
import ModalForm from '../components/ModalForm'
import { Modal, Button, Form, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MessageImageModule from '../modules/messageImageModule/MessageImageModule'
import SendMessageImageField from './MessageImageSendField'

const CurrentMessageImageModalForm = ({
    show,
    talkRoomId,
    onCancel
}) => {
    const dispatch = useDispatch()
    const loginUser = useSelector(state=>state.logStatus.isLoggedIn)
    return (
        <ModalForm show={show} onSubmit={(e)=>{
            e.preventDefault()
            dispatch(MessageImageModule.actions.execUploadMessageImage({
                userId:loginUser.id,
                messageImageParams: {
                    src:e.currentTarget.message_image.files[0]
                }
            }))
        }}>
            <Modal.Header>
                <h6>画像を選んでね</h6>
            </Modal.Header>
            <Modal.Body className="d-flex">
                <SendMessageImageField talkRoomId={talkRoomId}/>
            </Modal.Body>
            <Modal.Footer>
                <Form.Group>
                    <Form.Control type='file' name='message_image'/>
                    <Button className='ml-2' type='submit' variant='warning'>▶︎</Button>
                </Form.Group>
                <Button className='ml-2' variant='secondary'　onClick={onCancel}>やめる</Button>
            </Modal.Footer>
        </ModalForm>
    )
}

export default CurrentMessageImageModalForm