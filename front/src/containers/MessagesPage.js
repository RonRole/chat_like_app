import React from 'react'
import MessagesContainer from './MessagesContainer'
import MessageFormContainer from './MessageFormContainer'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'

class MessagePage extends React.Component {

    render(){
        return (
            <Container>
                <h3>{this.props.getTalkRoomById(this.props.match.params.id).title}</h3>
                <MessagesContainer {...this.props}/>
                <MessageFormContainer {...this.props}/>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        getTalkRoomById : (id) => state.talkRooms.ownRooms[id] || state.talkRooms.joinRooms[id]
    }
}

export default connect(mapStateToProps)(MessagePage)
