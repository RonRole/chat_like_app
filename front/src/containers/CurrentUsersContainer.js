import React from 'react'
import MessagesContainer from './MessagesContainer'
import MessageFormContainer from './MessageFormContainer'
import { Container, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import UserModule from '../modules/userModule/UserModule'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import TransparentWhenHovered from '../components/TransparentWhenHovered'

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
                                <TransparentWhenHovered 
                                    frontComponent={<Image className="mr-2 mb-2" id='set_image' src={user.image.thumb.url} style={{width:'50px', height:'50px', zIndex:'1'}} fluid/>}
                                    backComponent={<strong style={{color:'gray'}}>{user.name}</strong>}
                                />                    
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