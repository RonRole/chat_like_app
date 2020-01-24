import React from 'react'
import { Button } from 'react-bootstrap';

class MessageButton extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return  (
            <Button variant="primary" onClick={this.props.onClick} block>{this.props.buttonName}</Button>
        )
    }
}

MessageButton.defaultProps = {
    buttonName: "Button",
    onClick: () => alert("Hi this is Button!")
}

export default MessageButton;