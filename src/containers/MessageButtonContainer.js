import React from 'react'
import MessageButton from '../components/MessageButton'
import { Actions } from '../modules/AppModule'
import { connect } from 'react-redux'
import { Container, Button, ButtonGroup } from 'react-bootstrap'

class MessageButtonContainer extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <Container>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary" onClick={this.props.oon}>オォン！</Button>
                    <Button variant="secondary" onClick={this.props.aon}>アォン！</Button>
                </ButtonGroup>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        oon:() => dispatch(Actions.oon()),
        aon:() => dispatch(Actions.aon())
    }
}

export default connect(null, mapDispatchToProps)(MessageButtonContainer)