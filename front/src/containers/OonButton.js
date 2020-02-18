import React from 'react'
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import TalkRoomMessageModule from '../modules/talkRoomMessageModule/TalkRoomMessageModule';


export class OonButton extends React.Component {
    
    render(){
        return (
            <Button variant="primary" onClick={this.props.oon}>オォン！</Button>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        oon:() => dispatch(TalkRoomMessageModule.actions.addMessage({
            roomId:0,
            className:"primary",
            text:"オォン"
        }))
    }
}

export default connect(null,mapDispatchToProps)(OonButton)
