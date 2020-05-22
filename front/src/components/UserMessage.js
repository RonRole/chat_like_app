import { Image, Alert } from "react-bootstrap";
import React from 'react'

const Message = ({
    userImageUrl,
    userName,
    variant,
    text
}) => (
    <div>
        <Image src={userImageUrl}/>
        <strong className="ml-2">{userName}</strong>
        <Alert variant={variant}>
            {text}
        </Alert>
    </div>
)

Message.defaultProps = {
    userImageUrl : '',
    userName : 'no name',
    variant : 'primary',
    text : 'test text'
}

export default Message