import { Image, Alert } from "react-bootstrap";
import React from 'react'

const MessageTypes = {}

const MessageProtoType = ({
    userImageUrl,
    userName,
    className,
    children
}) => (
    <div className={className}>
        <Image src={userImageUrl} roundedCircle/>
        <strong className="ml-2">{userName}</strong>
        {children}
    </div>
)

MessageTypes.text = {}
MessageTypes.text.joinRoom = ({
    text
}) => (
    <Alert variant='primary'>
        {text}
    </Alert>
)
MessageTypes.text.leaveRoom = ({
    text
}) => (
    <Alert variant='danger'>
        {text}
    </Alert>
)
MessageTypes.text.myMessage = ({
    text
}) => (
    <Alert variant='success'>
        {text}
    </Alert>
)
MessageTypes.text.receiveMessage = ({
    text
}) => (
    <Alert variant='secondary'>
        {text}
    </Alert>
)

MessageTypes.image = {}
MessageTypes.image.messageImage = ({
    text
}) => (
    <div className='mb-2'>
        <Image src={text} />
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
        <MessageProtoType userImageUrl={userImageUrl} userName={userName}>
            <MessageCategory text={text}/>
        </MessageProtoType>
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