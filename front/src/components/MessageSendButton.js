import React from 'react'
import { Button } from 'react-bootstrap'

class MessageSendButton extends React.Component {
    render() {
        return (
            <Button variant="warning" type="submit">送信</Button>
        )

    }
}

export default MessageSendButton