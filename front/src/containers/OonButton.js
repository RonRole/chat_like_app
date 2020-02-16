import React from 'react'
import { Button } from 'react-bootstrap';
import { Actions } from '../modules/TalkRoomMessageModule';
import { connect } from 'react-redux';

export class OonButton extends React.Component {
    
    render(){
        return (
            <Button variant="primary" onClick={this.props.oon}>オォン！</Button>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        oon:() => dispatch(Actions.addMessage("primary","オォン!"))
    }
}

export default connect(null,mapDispatchToProps)(OonButton)
