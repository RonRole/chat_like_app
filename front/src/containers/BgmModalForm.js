import React from 'react'
import SoundActions from '../modules/soundModule/SoundActions'

const { useSelector, useDispatch } = require("react-redux")
const { default: ModalForm } = require("../components/ModalForm")
const { Modal, ListGroup, Form, Button } = require("react-bootstrap")

const BgmModalFormTitle = () => {
    return (
        <h6><strong>BGMを選択してください</strong></h6>
    )
}

const BgmList = () => {
    const dispatch = useDispatch()
    return (
        <ListGroup className='w-100'>
            <ListGroup.Item className='pointer opacity_iterate w-100' onClick={() => {
                dispatch(SoundActions.startBgm())
            }}>SAWAI</ListGroup.Item>
        </ListGroup>
    )
}

const BgmUploadFormGroup = () => {
    return (
        <Form.Group>
            <Form.Control
                className='invisible position-absolute'
                id='bgmUploadForm'
                type='file'
                name='bgm'
                onChange={(e) => {
                    console.log(e.currentTarget.files[0])
                }}
            />
            <Button className='ml-2' variant='primary' onClick={() => {
                document.getElementById('bgmUploadForm').click()
            }}>新しいBGMをアップロードする</Button>
        </Form.Group>
    )
}

const BgmModalForm = ({
    show = false,
    onCancel
}) => {
    const loginUser = useSelector(state => state.logStatus.isLoggedIn) || {}
    const dispatch = useDispatch()
    return (
        <ModalForm show = {show}>
            <Modal.Header>
                <BgmModalFormTitle />
            </Modal.Header>
            <Modal.Body className='d-flex row m-2 overflow-scroll'>
                <BgmList />
            </Modal.Body>
            <Modal.Footer>
                <BgmUploadFormGroup />
                <Button className='ml-2' variant='secondary'　onClick={onCancel}>やめる</Button>
            </Modal.Footer>
        </ModalForm>
    )
}

export default BgmModalForm