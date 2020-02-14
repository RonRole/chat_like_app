import React from 'react'
import { Container, Button, Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { TalkRoomActions } from '../modules/TaklRoomModule'
import TalkRoomCard from '../components/TalkRoomCard'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class TalkRoomPage extends React.Component {
    render() {
        return (
            <Container> 
                <Button variant="primary" onClick={this.props.addTalkRoom}>トークルームを追加</Button>
                <TransitionGroup className="row">
                    {this.props.talkRooms.map((talkRoom,index) => {
                        return(
                            <CSSTransition key = {index} timeout={100} classNames="fade">
                                <Col key={index} md={{span:4}} className="mt-2">
                                    <TalkRoomCard   className  ="col-md-4"
                                                    title      ={talkRoom.title} 
                                                    description={talkRoom.description}
                                                    id         ={1}
                                                    key        ={index} />  

                                </Col>
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
        talkRooms:state.talkRoomReducer.talkRooms
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTalkRoom:({title,description}) =>  dispatch(TalkRoomActions.addTalkRoom({title:title, description:description}))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TalkRoomPage)