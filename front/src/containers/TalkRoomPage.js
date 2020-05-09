import React from 'react'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { connect } from 'react-redux'
import { Container, Button, Pagination } from 'react-bootstrap'
import TalkRoomsArea from '../components/TalkRoomsArea'
import CreateTalkRoomForm from './CreateTalkRoomForm'
import ModalModule from '../modules/ModalModule/ModalModule'




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
                <TalkRoomsArea
                    className='mb-2' 
                    talkRoomIds={[...this.props.ownRoomIds].filter((_, index) => {
                        return (this.state.selectedOwnRoomPage-1)*this.state.paginateLength <= index && index < this.state.selectedOwnRoomPage*this.state.paginateLength
                    })}
                />
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
                <TalkRoomsArea
                    className='mb-2'
                    talkRoomIds={[...this.props.joinRoomIds].filter((_, index) => {
                        return (this.state.selectedJoinRoomPage-1)*this.state.paginateLength <= index && index < this.state.selectedJoinRoomPage*this.state.paginateLength
                    })}
                    readOnly
                />
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
                <CreateTalkRoomForm show={this.state.createModalShow} onCancel={()=> {
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
