import React from 'react'

const { useSelector, useDispatch } = require("react-redux")
const { default: ModalForm } = require("../components/ModalForm")
const { Modal, ListGroup, Form, Button } = require("react-bootstrap")

const BgmModalForm = ({
    show = false,
    onCancel
}) => {
    const loginUser = useSelector(state => state.logStatus.isLoggedIn) || {}
    const dispatch = useDispatch()

    return (
        <ModalForm show = {show}>
            <Modal.Header>
                <h6><strong>BGMを選択してください</strong></h6>
            </Modal.Header>
            <Modal.Body className='d-flex row m-2 overflow-scroll'>
                <ListGroup>
                    <ListGroup.Item className='pointer opacity_iterate'>SAWAI</ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
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
                <Button className='ml-2' variant='secondary'　onClick={onCancel}>やめる</Button>
            </Modal.Footer>
        </ModalForm>
    )
}

export default BgmModalForm