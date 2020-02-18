import React from 'react'
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import TalkRoomMessageModule from '../modules/talkRoomMessageModule/TalkRoomMessageModule';

export class AonButton extends React.Component {
    
    render(){
        return (
            <Button variant="danger" onClick={this.props.aon}>アォン！</Button>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        aon:() => dispatch(TalkRoomMessageModule.actions.addMessage({
            roomId:0,
            className:"danger",
            text:"アォン!"
        }))
    }
}

export default connect(null,mapDispatchToProps)(AonButton)
