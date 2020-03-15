import React from 'react'
import MessagesContainer from './MessagesContainer'
import MessageFormContainer from './MessageFormContainer'
import { Container, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import UserModule from '../modules/userModule/UserModule'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

class MessagePage extends React.Component {

    getCurrentUserIds = () => this.props.getTalkRoomById(this.props.match.params.id)["userIds"] || []

    render(){
        return (
            <Container>
                <h3>{this.props.getTalkRoomById(this.props.match.params.id).title}</h3>
                <Container className="d-flex">
                    <MessagesContainer {...this.props} className="mr-2" style={{height:"70vh", width:"100%", overflow:"scroll", border:"1px solid gray"}}/>
                    <Container style={{width:"40%", border:"1px solid gray", overflow:"scroll"}}>
                        <h6><strong>今いる人たち</strong></h6>
                        <TransitionGroup>
                            {this.getCurrentUserIds().map(id => this.props.getUserById(id)).map((user,index) => {
                                return (
                                    <CSSTransition key={index} timeout={100} classNames="fade">
                                        <div className="d-flex">
                                            <Image className="mr-2 mb-2" src={`${process.env.REACT_APP_BACKEND_ADDRESS}/${user.image.thumb.url}`}/>
                                            <h6>{user.name}</h6>
                                        </div>
                                    </CSSTransition>
                                )
                            })}
                        </TransitionGroup>
                    </Container>
                </Container>        
                <MessageFormContainer {...this.props}/>
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

export default connect(mapStateToProps)(MessagePage)
