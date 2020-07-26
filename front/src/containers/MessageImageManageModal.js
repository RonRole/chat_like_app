import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MessageImageList from './MessageImageList'
import LargeImageModal from '../components/LargeImageModal'
import MessageImageActions from '../modules/messageImageModule/MessageImageActions'
import MessageImageUploadFormGroup from './MessageImageUploadFormGroup'
import styled from 'styled-components'

const { useSelector, useDispatch } = require("react-redux")
const { Modal, Image, Button } = require("react-bootstrap")

const LargeImageModalBody = styled(Modal.Body)`
    display:flex;
    justify-content:center;
    overflow:auto;
`

const StyledImage = styled(Image)`
    object-fit:contain;
`

const MessageImageManageModal = ({
    onCancel,
    ...props
}) => {
    const dispatch = useDispatch()
    const [largeImageModalShow, setLargeImageModalShow] = useState(false)
    const [largeImage, setLargeImage] = useState({src:{url:''}})

    return (
        <Modal onHide={onCancel} {...props} >
            <Modal.Header closeButton>
                <h6><strong>画像管理</strong></h6>
            </Modal.Header>
            <Modal.Body>
                <MessageImageList onClickImage={messageImage => {
                    setLargeImage(messageImage)
                    setLargeImageModalShow(true)
                }} />
            </Modal.Body>
            <Modal.Footer>
                <MessageImageUploadFormGroup />
            </Modal.Footer>
            <LargeImageModal show={largeImageModalShow} largeImageSrc={largeImage.src.url} onCancel={()=>setLargeImageModalShow(false)} scrollable>
                <Modal.Header closeButton></Modal.Header>
                <LargeImageModalBody>
                    <StyledImage src={largeImage.src.url} fluid/>
                </LargeImageModalBody>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => {
                        dispatch(MessageImageActions.execDeleteMessageImage({
                            messageImageId : largeImage.id
                        }))
                        setLargeImageModalShow(false)
                    }}>削除</Button>
                </Modal.Footer>
            </LargeImageModal>
        </Modal>
    )
}

const ShowLink = ({
    ...props
}) => {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <Link {...props} onClick = {() => {
                setShowModal(true)
            }}>画像管理</Link> 
            <MessageImageManageModal scrollable show={showModal} onCancel={()=>setShowModal(false)}/>
        </>
    )
}
MessageImageManageModal.ShowLink = ShowLink

export default MessageImageManageModal