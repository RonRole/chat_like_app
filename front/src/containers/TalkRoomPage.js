import React from 'react'
import { Container, Button, Col, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import TalkRoomCard from '../components/TalkRoomCard'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import TalkRoomAddingForm from '../components/TalkRoomAddingForm'
import { getTalkRoomIds } from '../modules/talkRoomModule/TalkRoomReducer'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'

export class TalkRoomPage extends React.Component {
    state = {
        modalShow : false
    }
    componentDidMount() {
        this.props.getJoinedRooms(this.props.history)
    }
    render() {
        return (
            <Container> 
                <h6 style={{borderBottom:"1px solid gray"}}>
                    <strong>{this.props.loginUser.name}</strong>さんが作成したトークルーム
                </h6>
                <Button variant="primary" onClick={() => this.setState({modalShow:true})}>トークルームを追加</Button>
                <TransitionGroup className="row">
                    {this.props.ownRooms.map((talkRoomId,index) => {
                        return(
                            <CSSTransition key = {index} timeout={100} classNames="fade">
                                <Col key={index} md={{span:4}} className="mt-2">
                                    <TalkRoomCard   className  ="col-md-4"
                                                    title      ={this.props.getTalkRoomById(talkRoomId).title} 
                                                    description={this.props.getTalkRoomById(talkRoomId).description}
                                                    id         ={talkRoomId}
                                                    key        ={index} 
                                                    destroy    ={this.props.destroyTalkRoom}/>  

                                </Col>
                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>
                
                <h6 style={{borderBottom:"1px solid gray"}}>
                    <strong>{this.props.loginUser.name}</strong>さんが参加しているトークルーム
                </h6>
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
                                                    destroy    ={this.props.destroyTalkRoom}/>  

                                </Col>
                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>

                <TalkRoomAddingForm onSubmit={({title,description})=>{
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
        loginUser       : state.logReducer.isLoggedIn,
        talkRooms       : state.talkRoomReducer.talkRooms,
        talkRoomIds     : getTalkRoomIds(state.talkRoomReducer).filter(id => state.talkRoomReducer.talkRooms[id].author_id !== state.logReducer.isLoggedIn.id),
        getTalkRoomById : (id) => state.talkRoomReducer.talkRooms[id],
        ownRooms        : getTalkRoomIds(state.talkRoomReducer).filter(id => state.talkRoomReducer.talkRooms[id].author_id === state.logReducer.isLoggedIn.id)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getJoinedRooms:(history) => dispatch(TalkRoomModule.actions.execGetJoinedRooms(history)),
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
        destroyTalkRoom:(talkRoomId) => dispatch(TalkRoomModule.actions.execDeleteTalkRoom({
            talkRoomId: talkRoomId
        }))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TalkRoomPage)
