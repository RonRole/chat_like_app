import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import SoundActions from '../modules/soundModule/SoundActions'

const BgmUploadFormGroup = () => {
    const dispatch = useDispatch()
    const loginUser = useSelector(state => state.logStatus.loginUser)
    return (
        <Form.Group>
            <Form.Control
                className='invisible position-absolute'
                id='bgmUploadForm'
                type='file'
                name='bgm'
                onChange={(e) => {
                    const currentTargetFile = e.currentTarget.files[0] 
                    if(currentTargetFile) {
                        dispatch(SoundActions.uploadBgm({
                            userId : loginUser.id,
                            bgmParams : {
                                src : currentTargetFile,
                                title :　currentTargetFile.name.replace(/\.[^.]+$/,'')
                            }
                        }))
                    }
                }}
            />
            <Button className='ml-2' variant='primary' onClick={() => {
                document.getElementById('bgmUploadForm').click()
            }}>新しいBGMをアップロードする</Button>
        </Form.Group>
    )
}

export default BgmUploadFormGroup