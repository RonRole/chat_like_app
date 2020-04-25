import React from 'react'
import MessagesContainer from './MessagesContainer'
import MessageFormContainer from './MessageFormContainer'
import { Container, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import UserModule from '../modules/userModule/UserModule'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

class CurrentUsersContainer extends React.Component {

    getCurrentUserIds = () => this.props.getTalkRoomById(this.props.match.params.id)["currentUserIds"] || []

    render() {
        return (
            <Container {...this.props}>
                <h6><strong>今いる人たち</strong></h6>
                <TransitionGroup className='d-flex'>
                    {this.getCurrentUserIds().map(id => this.props.getUserById(id)).map((user,index) => {
                        return (
                            <CSSTransition key={index} timeout={100} classNames="fade">
                                <div className="d-flex">
                                    <Image className="mr-2 mb-2" src={user.image.thumb.url} style={{width:'50px', height:'50px'}} fluid/>
                                    <h6>{user.name}</h6>
                                </div>
                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        allState : state,
        getTalkRoomById : (id) => TalkRoomModule.reducer.getTalkRoomById(state)(id),
        getUserById : (userId) => UserModule.reducer.getUserById(state)(userId)
    }
}

export default connect(mapStateToProps)(CurrentUsersContainer)