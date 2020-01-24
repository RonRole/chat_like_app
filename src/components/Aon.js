import React from 'react'
import { Row, Col } from 'react-bootstrap';

class Aon extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Row>
                <Col md={{span:2,offset:6}}>
                    <h1>アォン!</h1>
                </Col>
            </Row>
        )
    }
}

export default Aon;