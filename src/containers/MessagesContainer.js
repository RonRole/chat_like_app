import React from 'react'
import {connect} from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'

class MessagesContainer extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <Container>
                {this.props.messageComponents}
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messageComponents: state.messageComps
    }
}

export default connect(mapStateToProps, null)(MessagesContainer);

