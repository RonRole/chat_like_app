import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import MessageImageModule from '../modules/messageImageModule/MessageImageModule'

const MessageImageUploadFormGroup = ({
    ...props
}) => {
    const dispatch = useDispatch()
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    return (
        <Form.Group {...props}>
            <Form.Control 
                className='invisible position-absolute' 
                id='messageImageUploadForm' 
                type='file' 
                name='message_image'
                accept='image/*'
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

export default MessageImageUploadFormGroup