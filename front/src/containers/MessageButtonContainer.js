import React from 'react'
import { Actions, Variants } from '../modules/AppModule'
import { connect } from 'react-redux'
import { Container, Button, ButtonGroup } from 'react-bootstrap'

class MessageButtonContainer extends React.Component {
    render() {
        return (
            <Container>
                <ButtonGroup aria-label="Basic example">
                    <Button variant={Variants.oon} onClick={this.props.oon}>オォン！</Button>
                    <Button variant={Variants.aon} onClick={this.props.aon}>アォン！</Button>
                </ButtonGroup>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        oon:() => dispatch(Actions.addMessage(Variants.oon,"オォン!")),
        aon:() => dispatch(Actions.addMessage(Variants.aon,"アォン!")),
    }
}

export default connect(null, mapDispatchToProps)(MessageButtonContainer)