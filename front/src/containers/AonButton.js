import React from 'react'
import { Button } from 'react-bootstrap';
import { Actions } from '../modules/MessageModule';
import { connect } from 'react-redux';

export class AonButton extends React.Component {
    
    render(){
        return (
            <Button variant="danger" onClick={this.props.aon}>アォン！</Button>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        aon:() => dispatch(Actions.addMessage("danger","アォン!"))
    }
}

export default connect(null,mapDispatchToProps)(AonButton)
