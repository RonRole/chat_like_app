import React from 'react'
import { Container, Button, Col, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { TalkRoomActions, getTalkRoomIds } from '../modules/TalkRoomModule'
import TalkRoomCard from '../components/TalkRoomCard'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import TalkRoomAddingForm from '../components/TalkRoomAddingForm'

export class TalkRoomPage extends React.Component {
    state = {
        modalShow : false
    }
    componentDidMount() {
        this.props.initialize()
    }
    render() {
        return (
            <Container> 
                <Button variant="primary" onClick={() => this.setState({modalShow:true})}>トークルームを追加</Button>
                <TransitionGroup className="row">
                    {this.props.talkRoomIds().map((talkRoomId,index) => {
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
                            title:title, 
                            description:description
                        })
                        this.setState({modalShow:false})
                    }}
                    closeModal = {() => this.setState({modalShow:false})}
                    show = {this.state.modalShow} 
                />
            </Container>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        talkRooms: state.talkRoomReducer.talkRooms,
        talkRoomIds:() => getTalkRoomIds(state.talkRoomReducer),
        getTalkRoomById:(id) => state.talkRoomReducer.talkRooms[id]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initialize:() => dispatch(TalkRoomActions.tryToInitializeTalkRooms()),
        addTalkRoom:({title,description}) =>  
            dispatch(TalkRoomActions.tryToAddTalkRoom({
                title:title, 
                description:description
            })),
        destroyTalkRoom:(talk_room_id) => dispatch(TalkRoomActions.tryToDeleteTalkRoom({
            talk_room_id: talk_room_id
        }))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TalkRoomPage)
