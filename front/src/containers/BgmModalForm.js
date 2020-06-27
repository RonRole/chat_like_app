import React from 'react'
import SoundActions from '../modules/soundModule/SoundActions'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'

const { useSelector, useDispatch } = require("react-redux")
const { default: ModalForm } = require("../components/ModalForm")
const { Modal, ListGroup, Form, Button } = require("react-bootstrap")

const BgmModalFormTitle = () => {
    return (
        <h6><strong>BGMを選択してください</strong></h6>
    )
}

const BgmList = ({
    talkRoomId
}) => {
    const loginUser = useSelector(state => state.logStatus.loginUser) 
    const dispatch = useDispatch()
    const bgms = useSelector(state => state.bgms)
    return (
        <ListGroup className='w-100'>
            {Object.values(bgms).filter(bgm => bgm.id > 0).map((bgm, index) => (
                <ListGroup.Item key={index} className='pointer opacity_iterate w-100' onClick={() => {
                    dispatch(CurrentRoomStatusModule.actions.addMessage({
                        roomId : talkRoomId,
                        messageClass : 'system',
                        user : loginUser,
                        text : <div><p>{loginUser.name}さんがBGMを流しました</p><p>{bgm.title}</p></div>
                    }))
                    dispatch(CurrentRoomStatusModule.actions.sendMessage({
                        roomId : talkRoomId,
                        messageClass : 'system',
                        user : loginUser,
                        text : `${loginUser.name}さんがBGMを流しました`
                    }))
                    dispatch(CurrentRoomStatusModule.actions.changeRoomBgm({
                        talkRoomId,
                        bgmSrcUrl : bgm.src.url
                    }))
                }}>{bgm.title}</ListGroup.Item>
            ))}
        </ListGroup>
    )
}

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
                    dispatch(SoundActions.uploadBgm({
                        userId : loginUser.id,
                        bgmParams : {
                            src : currentTargetFile,
                            title :　currentTargetFile.name.replace(/\.[^.]+$/,'')
                        }
                    }))
                }}
            />
            <Button className='ml-2' variant='primary' onClick={() => {
                document.getElementById('bgmUploadForm').click()
            }}>新しいBGMをアップロードする</Button>
        </Form.Group>
    )
}

const BgmModalForm = ({
    talkRoomId,
    show = false,
    onCancel
}) => {
    return (
        <Modal show = {show}>
            <Modal.Header>
                <BgmModalFormTitle />
            </Modal.Header>
            <Modal.Body className='d-flex row m-2 overflow-scroll'>
                <BgmList talkRoomId={talkRoomId} />
            </Modal.Body>
            <Modal.Footer>
                <BgmUploadFormGroup />
                <Button className='ml-2' variant='secondary'　onClick={onCancel}>やめる</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BgmModalForm