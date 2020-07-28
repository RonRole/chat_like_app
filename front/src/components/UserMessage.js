import { Image, Alert, Modal, Button, Col, Fade } from "react-bootstrap";
import React, { useState } from 'react'
import LargeImageModal from "./LargeImageModal";
import styled from "styled-components";
import UserHeader from "./UserHeader";

const CenterTextAlert = styled(Alert)`
    text-align: center;
`

const MessageTypes = {}
MessageTypes.text = {}
MessageTypes.text.system = ({
    text,
}) => (
    <CenterTextAlert variant='warning' className='col-sm-6 offset-sm-3'>{text}</CenterTextAlert>
)

MessageTypes.text.joinRoom = ({
    text,
}) => (
    <CenterTextAlert variant='primary' className='col-sm-6 offset-sm-3'>{text}</CenterTextAlert>
)
MessageTypes.text.leaveRoom = ({
    text
}) => (
    <CenterTextAlert variant='danger' className='col-sm-6 offset-sm-3'>{text}</CenterTextAlert>
)
MessageTypes.text.myMessage = ({
    userImageUrl,
    userName,
    text
}) => (
    <>
        <UserHeader userImageUrl={userImageUrl} userName={userName} />
        <Alert variant='success' className='col-sm-6'>{text}</Alert>
    </>
)
MessageTypes.text.receiveMessage = ({
    userImageUrl,
    userName,
    text
}) => (
    <>
        <Col sm={{offset:6}}>
            <UserHeader userImageUrl={userImageUrl} userName={userName} />
         </Col>
        <Alert variant='secondary' className='col-sm-6 offset-sm-6'>{text}</Alert>
    </>
)

MessageTypes.image = {}

const AppliedImage = styled(Image)`
    opacity:1.0;
    transition: all 0.2s;
    cursor:pointer;
    :hover {
        opacity:0.5;
        transition: all 0.2s;
    }
`

const LargeImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    overflow: auto;
`
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
                    <UserHeader userImageUrl={userImageUrl} userName={userName} />
                </div>
                <AppliedImage src={text} className='mb-2' onClick={()=>setModalShow(true)}/>
            </div>
            <LargeImageModal show={modalShow} largeImageSrc={largeImageSrc} onCancel={() => setModalShow(false)} scrollable>
                <Modal.Header closeButton></Modal.Header>
                <LargeImageWrapper>
                    <Image src={largeImageSrc} fluid/>
                </LargeImageWrapper>
            </LargeImageModal>
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
        <div className='offset-sm-6 col-sm-6'>
            <div>
                <div>
                    <UserHeader userImageUrl={userImageUrl} userName={userName} />
                </div>
                <AppliedImage src={text} onClick={()=>setModalShow(true)}/>
            </div>
            <LargeImageModal show={modalShow} largeImageSrc={largeImageSrc} onCancel={() => setModalShow(false)} scrollable>
                <Modal.Header closeButton></Modal.Header>
                <div className='d-flex justify-content-center overflow-auto'>
                    <Image src={largeImageSrc} fluid/>
                </div>
            </LargeImageModal>
        </div>
    )
}
MessageTypes.image.receiveMessageImage = styled(ReceiveMessageImage)`
    display: flex;
    justify-content: center;
`

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