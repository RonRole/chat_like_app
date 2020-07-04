import { Image, Alert, Modal, Button } from "react-bootstrap";
import React, { useState } from 'react'

const MessageTypes = {}

MessageTypes.text = {}
MessageTypes.text.system = ({
    text,
}) => (
    <Alert variant='warning' className='col-sm-6 offset-sm-3 text-center'>{text}</Alert>
)

MessageTypes.text.joinRoom = ({
    text,
}) => (
    <Alert variant='primary' className='col-sm-6 offset-sm-3 text-center'>{text}</Alert>
)
MessageTypes.text.leaveRoom = ({
    text
}) => (
    <Alert variant='danger' className='col-sm-6 offset-sm-3 text-center'>{text}</Alert>
)
MessageTypes.text.myMessage = ({
    userImageUrl,
    userName,
    text
}) => (
    <>
        <Image src={userImageUrl} roundedCircle/><strong className="ml-2">{userName}</strong>
        <Alert variant='success' className='col-sm-6'>{text}</Alert>
    </>
)
MessageTypes.text.receiveMessage = ({
    userImageUrl,
    userName,
    text
}) => (
    <>
        <div className='offset-sm-6'>
            <Image src={userImageUrl} roundedCircle/><strong className="ml-2">{userName}</strong>
        </div>
        <Alert variant='secondary' className='col-sm-6 offset-sm-6'>{text}</Alert>
    </>
)

MessageTypes.image = {}
const LargeImageModal = ({
    show,
    largeImageSrc,
    onCancel
}) => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const largeImage = document.createElement('img')
    largeImage.onload = () => {
        setWidth(largeImage.naturalWidth)
        setHeight(largeImage.naturalHeight)
    }
    largeImage.src = largeImageSrc
    const imageViewWidth = Math.ceil(width/window.parent.screen.width*10)*10
    const dialogWidth = `vw-${Math.min(80, imageViewWidth)}`
    return (
        <Modal show={show} onHide={onCancel} dialogClassName={dialogWidth}  scrollable>
            <Modal.Header closeButton></Modal.Header>
            <div className='d-flex justify-content-center overflow-scroll'>
                <Image src={largeImageSrc} fluid/>
            </div>
        </Modal>
    )
}


const MessageImage = ({
    userImageUrl,
    userName,
    text,
    largeImageSrc
}) => {
    const [modalShow, setModalShow] = useState(false)
    return (
        <>
            <div>
                <div>
                    <Image src={userImageUrl} roundedCircle/><strong className="ml-2">{userName}</strong>
                </div>
                <Image src={text} className='mb-2 pointer opacity-under-mouse' onClick={()=>setModalShow(true)}/>
            </div>
            <LargeImageModal show={modalShow} largeImageSrc={largeImageSrc} onCancel={() => setModalShow(false)}/>
        </>
    )
}
MessageTypes.image.messageImage = MessageImage



const ReceiveMessageImage = ({
    userImageUrl,
    userName,
    text,
    largeImageSrc
}) => {
    const [modalShow, setModalShow] = useState(false)
    return (
        <div className='d-flex justify-content-end offset-sm-6 col-sm-6'>
            <div>
                <div>
                    <Image src={userImageUrl} roundedCircle/><strong className="ml-2">{userName}</strong>
                </div>
                <Image src={text} className='mb-2 pointer opacity-under-mouse' onClick={()=>setModalShow(true)}/>
            </div>
            <LargeImageModal show={modalShow} largeImageSrc={largeImageSrc} onCancel={() => setModalShow(false)}/>
        </div>
    )
}
MessageTypes.image.receiveMessageImage = ReceiveMessageImage

/**
 * 
 * @param {userImageUrl,
    userName,
    messageType,
    messageClass,
    text}
 */
const UserMessage = ({
    ...messageProps
}) => {
    const {messageType, messageClass, ...otherProps} = {...messageProps}
    const MessageType = MessageTypes[messageType] || MessageTypes.text
    const MessageCategory = MessageType[messageClass] || MessageTypes.text.receiveMessage
    return (
        <MessageCategory {...otherProps}/>
    )
}

UserMessage.defaultProps = {
    userImageUrl : '',
    userName : 'no name',
    messageType:'test',
    messageClass:'receiveMessage',
    text : 'test text'
}

export default UserMessage