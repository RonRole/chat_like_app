import { Image, Alert } from "react-bootstrap";
import React from 'react'

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
MessageTypes.image.messageImage = ({
    userImageUrl,
    userName,
    text
}) => (
    <div>
        <div>
            <Image src={userImageUrl} roundedCircle/><strong className="ml-2">{userName}</strong>
        </div>
        <Image src={text} className='mb-2'/>
    </div>
)
MessageTypes.image.receiveMessageImage = ({
    userImageUrl,
    userName,
    text
}) => (
    <div className='d-flex justify-content-end offset-sm-6 col-sm-6'>
        <div>
            <div>
                <Image src={userImageUrl} roundedCircle/><strong className="ml-2">{userName}</strong>
            </div>
            <Image src={text} className='mb-2'/>
        </div>
    </div>
)


const UserMessage = ({
    userImageUrl,
    userName,
    messageType,
    messageClass,
    text
}) => {
    const MessageType = MessageTypes[messageType] || MessageTypes.text
    const MessageCategory = MessageType[messageClass] || MessageTypes.text.receiveMessage
    return (
        <MessageCategory userImageUrl={userImageUrl} userName={userName} text={text}/>
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