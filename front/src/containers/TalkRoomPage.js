import React from 'react'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { connect } from 'react-redux'
import { Container, Button, Pagination, Col } from 'react-bootstrap'
import CreateTalkRoomForm from './CreateTalkRoomForm'
import ModalModule from '../modules/ModalModule/ModalModule'
import TalkRoomCard from './TalkRoomCard'
import TransitionItems from '../components/TransitionItems'

const TalkRoomAreaLabel = ({
    userName,
    text
}) => {
    return (
        <div>
            <h6 style={{borderBottom:"1px solid gray"}}>
                <strong>{userName}</strong>{text}
            </h6>
        </div>
    )
}

class TalkRoomPage extends React.Component {

    state = {

        createModalShow : false,
        paginateLength : 3,
        selectedOwnRoomPage : 1,
        selectedJoinRoomPage : 1
    }

    componentDidMount() {
        this.props.getOwnRooms()
        this.props.getJoinRooms()
    }
    
    render() {
        return (
            <Container>
                <TalkRoomAreaLabel userName={this.props.loginUser.name} text="さんが作成したトークルーム" />
                <Button variant="primary" onClick={() => this.setState({createModalShow:true})}>トークルームを追加</Button>
                <TransitionItems className='row' classNames='fade'>
                    {[...this.props.ownRoomIds].filter((_, index) => {
                        return (this.state.selectedOwnRoomPage-1)*this.state.paginateLength <= index && index < this.state.selectedOwnRoomPage*this.state.paginateLength
                    }).map((id,index) => (
                        <Col key={index} md='4'>
                            <TalkRoomCard id={id} key={id} />
                        </Col>
                    ))}
                </TransitionItems>
                <Pagination>
                    {[...Array(Math.ceil(this.props.ownRoomIds.length/this.state.paginateLength))].map((_, index) => index+1).map((pageNumber) => {
                        return <Pagination.Item 
                                    key={pageNumber}
                                    active={pageNumber===this.state.selectedOwnRoomPage} 
                                    onClick={()=>this.setState({selectedOwnRoomPage:pageNumber})}
                                >
                                    {pageNumber}
                                </Pagination.Item>
                    })}
                </Pagination>
                <TalkRoomAreaLabel userName={this.props.loginUser.name} text="さんが参加しているトークルーム" />
                <TransitionItems className='row' classNames='fade'>
                    {[...this.props.joinRoomIds].filter((_, index) => {
                        return (this.state.selectedJoinRoomPage-1)*this.state.paginateLength <= index && index < this.state.selectedJoinRoomPage*this.state.paginateLength
                    }).map((id,index) => (
                        <Col key={index} md='4'>
                            <TalkRoomCard id={id} key={id} readOnly/>
                        </Col>
                    ))}
                </TransitionItems>
                <Pagination>
                    {[...Array(Math.ceil(this.props.joinRoomIds.length/this.state.paginateLength))].map((_, index) => index+1).map((pageNumber) => {
                        return <Pagination.Item 
                                    key={pageNumber}
                                    active={pageNumber===this.state.selectedJoinRoomPage} 
                                    onClick={()=>this.setState({selectedJoinRoomPage:pageNumber})}
                                >
                                    {pageNumber}
                                </Pagination.Item>
                    })}
                </Pagination>
                <CreateTalkRoomForm show={this.state.createModalShow} 
                                    toCloseModalAction ={()=> {
                                    this.setState({
                                        createModalShow : false
                                    })
                }}/>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state,
        loginUser : state.logStatus.isLoggedIn,
        ownRoomIds : TalkRoomModule.reducer.getOwnRoomIds(state),
        joinRoomIds : TalkRoomModule.reducer.getJoinRoomIds(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOwnRooms : () => dispatch(TalkRoomModule.actions.execGetOwnRooms()),
        getJoinRooms : () => dispatch(TalkRoomModule.actions.execGetJoinedRooms()),
        showModalOf : (modalName) => dispatch(ModalModule.actions.showModalOf(modalName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TalkRoomPage)
