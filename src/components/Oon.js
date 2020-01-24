import React from 'react'
import { Row, Col } from 'react-bootstrap';

class Oon extends React.Component {
    constructor(props){
        super(props)
    }

    style = {
        color:"red"
    }

    render(){
        return (
            <h1 style={this.style}>オォン!</h1>
        )
    }
}

export default Oon;