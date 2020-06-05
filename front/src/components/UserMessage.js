import { Image, Alert } from "react-bootstrap";
import React from 'react'

const MessageCategories = {}

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

MessageCategories.joinRoom = ({
    text
}) => (
    <Alert variant='primary'>
        {text}
    </Alert>
)

MessageCategories.leaveRoom = ({
    text
}) => (
    <Alert variant='danger'>
        {text}
    </Alert>
)

MessageCategories.myMessage = ({
    text
}) => (
    <Alert variant='success'>
        {text}
    </Alert>
)

MessageCategories.receiveMessage = ({
    text
}) => (
    <Alert variant='secondary'>
        {text}
    </Alert>
)

MessageCategories.messageImage = ({
    text
}) => (
    <div className='mb-2'>
        <Image src={text} />
    </div>
)


const UserMessage = ({
    userImageUrl,
    userName,
    messageType = 'receiveMessage',
    text
}) => {
    const MessageCategory = MessageCategories[messageType]
    return (
        <MessageProtoType userImageUrl={userImageUrl} userName={userName}>
            <MessageCategory text={text}/>
        </MessageProtoType>
    )
}

UserMessage.defaultProps = {
    userImageUrl : '',
    userName : 'no name',
    messageType:'receiveMessage',
    text : 'test text'
}

export default UserMessage