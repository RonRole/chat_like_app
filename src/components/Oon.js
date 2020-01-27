import React from 'react'
import { Alert } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Oon extends React.Component {
    constructor(props){
        super(props)
    }

    style = {
        color:"red"
    }

    render(){
        return (
            <Alert variant="danger">オォン!</Alert>
        )
    }
}

export default Oon;