import React from 'react'
import { Container, Button, Col, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import TalkRoomCard from '../components/TalkRoomCard'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import TalkRoomModalForm from '../components/TalkRoomModalForm'
import { getJoinRoomIds, getOwnRoomIds } from '../modules/talkRoomModule/TalkRoomReducer'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'

class TalkRoomsArea extends React.Component {

    render() {
        return (
            <TransitionGroup className="row">
                {this.props.talkRoomIds.map((talkRoomId,index) => {
                    return(
                        <CSSTransition key = {index} timeout={100} classNames="fade">
                            <Col key={index} md={{span:4}} className="mt-2">
                                <TalkRoomCard   className  ="col-md-4"
                                                title      ={this.props.getTalkRoomById(talkRoomId).title} 
                                                description={this.props.getTalkRoomById(talkRoomId).description}
                                                id         ={talkRoomId}
                                                key        ={index} 
                                                readOnly   ={this.props.readOnly}/>  

                            </Col>
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        )
    }
}

class TalkRoomAreaLabel extends React.Component {
    render() {
        return(
            <h6 style={{borderBottom:"1px solid gray"}}>
                <strong>{this.props.loginUser.name}</strong>{this.props.about}
            </h6>
        )
    }
}

export class TalkRoomPage extends React.Component {
    state = {
        modalShow : false
    }
    componentDidMount() {
        this.props.getOwnRooms(this.props.history)
        this.props.getJoinedRooms(this.props.history)
    }
    render() {
        return (
            <Container> 
                <TalkRoomAreaLabel loginUser={this.props.loginUser} about="さんが作成したトークルーム" />
                <Button variant="primary" onClick={() => this.setState({modalShow:true})}>トークルームを追加</Button>
                <TalkRoomsArea {...this.props} talkRoomIds={this.props.ownRoomIds} />

                <TalkRoomAreaLabel loginUser={this.props.loginUser} about="さんが参加しているトークルーム" />
                <TalkRoomsArea {...this.props} talkRoomIds={this.props.joinedRoomIds} readOnly/>

                <TalkRoomModalForm onSubmit={({title,description})=>{
                        this.props.addTalkRoom({
                            history     : this.props.history,
                            title       : title, 
                            description : description,
                            authorId    : this.props.loginUser.id
                        })
                        this.setState({modalShow:false})
                    }}
                    loginUser = {this.props.loginUser}
                    closeModal = {() => this.setState({modalShow:false})}
                    show = {this.state.modalShow} 
                />
            </Container>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        loginUser         : state.logReducer.isLoggedIn,
        talkRooms         : state.talkRoomReducer.talkRooms,
        joinedRoomIds     : getJoinRoomIds(state.talkRoomReducer),
        getTalkRoomById   : (id) => state.talkRoomReducer.ownRooms[id] || state.talkRoomReducer.joinRooms[id],
        ownRoomIds        : getOwnRoomIds(state.talkRoomReducer)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOwnRooms   : (history) => dispatch(TalkRoomModule.actions.execGetOwnRooms(history)), 
        getJoinedRooms: (history) => dispatch(TalkRoomModule.actions.execGetJoinedRooms(history)),
        addTalkRoom:({
            history,
            title,
            description,
            authorId
        }) =>  {
            dispatch(TalkRoomModule.actions.execAddTalkRoom({
                history    : history,
                title      : title, 
                description: description,
                authorId   : authorId
            }))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TalkRoomPage)
