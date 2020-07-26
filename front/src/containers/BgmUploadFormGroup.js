import React, { useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import SoundActions from '../modules/soundModule/SoundActions'
import Visible from '../style-components/Visible'

const BgmUploadFormGroup = () => {
    const dispatch = useDispatch()
    const loginUser = useSelector(state => state.logStatus.loginUser)
    const uploadFormRef = useRef(null)
    return (
        <Form.Group>
            <Visible aria-hidden='true'>
                <Form.Control
                    type='file'
                    name='bgm'
                    accept='.mp3, .m4a, .wav'
                    ref={uploadFormRef}
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
            </Visible>
            <Button className='ml-2' variant='primary' onClick={() => {
                uploadFormRef.current.click()
            }}>新しいBGMをアップロードする</Button>
        </Form.Group>
    )
}

export default BgmUploadFormGroup