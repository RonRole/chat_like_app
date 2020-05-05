import React from 'react'
import { Container, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import UserModule from '../modules/userModule/UserModule'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Transparent from '../components/Transparent'
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule'

class CurrentUsersContainer extends React.Component {

    getCurrentUserIds = () => this.props.getCurrentRoomStatusById(this.props.match.params.id)["currentUserIds"] || []
    getCurrentUserStatus = () => this.props.getCurrentRoomStatusById(this.props.match.params.id)["currentUserStatus"] || []

    render() {
        return (
            <Container {...this.props}>
                <h6><strong>今いる人たち</strong></h6>
                <TransitionGroup className='d-flex'>
                    {this.getCurrentUserIds().map(id => this.props.getUserById(id)).map((user,index) => {
                        return (
                            <CSSTransition key={index} timeout={100} classNames="fade">
                                <Transparent 
                                    frontComponent = {<Image className="mr-2 mb-2" id='set_image' src={user.image.thumb.url} style={{width:'50px', height:'50px', zIndex:'1'}} fluid/>}
                                    backComponent = {
                                        <div style={{
                                            fontWeight:'bold',
                                            textAlign:'center',
                                            width:'50px'
                                        }}>
                                            {this.getCurrentUserStatus()[user.id]}
                                    </div>}
                                    transParent = {this.getCurrentUserStatus()[user.id]}
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
        getCurrentRoomStatusById : (id) => CurrentRoomStatusModule.reducer.getCurrentStatusOfRoom(state)(id),
        getUserById : (userId) => UserModule.reducer.getUserById(state)(userId)
    }
}

export default connect(mapStateToProps)(CurrentUsersContainer)