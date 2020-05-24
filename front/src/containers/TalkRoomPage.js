import React from 'react'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { connect } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import CreateTalkRoomForm from './CreateTalkRoomForm'
import ModalModule from '../modules/ModalModule/ModalModule'



import TalkRoomsArea from './TalkRoomsArea'

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
    }

    componentDidMount() {
        this.props.getOwnRooms()
        this.props.getJoinRooms()
    }
    
    render() {
        return (
            <Container>
                <TalkRoomAreaLabel userName={this.props.loginUser.name} text="さんが作成したトークルーム" />
                <Button variant="primary" className='mb-2' onClick={() => this.setState({createModalShow:true})}>トークルームを追加</Button>
                <TalkRoomsArea.OwnRoomsArea itemLengthPerPage={3} />
                <TalkRoomAreaLabel userName={this.props.loginUser.name} text="さんが参加しているトークルーム" />
                <TalkRoomsArea.JoinRoomsArea itemLengthPerPage={3} />
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
