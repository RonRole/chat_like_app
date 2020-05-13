import React from 'react'
import MessagesContainer from './MessagesContainer'
import MessageFormContainer from './MessageFormContainer'
import { Container, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import UserModule from '../modules/userModule/UserModule'
import CurrentUsersContainer from './CurrentUsersContainer'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'

class MessagePage extends React.Component {

    render(){
        return (
            <div>
                <Sidebar>
                    <Link className='nav-link' onClick={()=>alert('Unko')}>Test</Link>
                    <Link className = "nav-link" to="/talk_rooms">退出する</Link>
                    <Link className = "nav-link" to="/talk_rooms">Test</Link>
                </Sidebar>
                <Container className="justify-content-center">
                    <strong>{this.props.getTalkRoomById(this.props.match.params.id).title}</strong>
                    <CurrentUsersContainer {...this.props} className='mb-2' style={{height:'auto', width:'100%', border:"1px solid gray"}}/>
                    <MessagesContainer {...this.props} className="mb-2" style={{height:"65vh", width:"100%", overflow:"scroll", border:"1px solid gray"}}/>
                    <MessageFormContainer {...this.props} />
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state,
        getTalkRoomById : (id) => TalkRoomModule.reducer.getTalkRoomById(state)(id),
        getUserById : (userId) => UserModule.reducer.getUserById(state)(userId)
    }
}

export default connect(mapStateToProps)(MessagePage)
