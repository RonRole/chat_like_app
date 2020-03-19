import React from 'react'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { connect } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import TalkRoomsArea from '../components/TalkRoomsArea'
import { CreateTalkRoomForm, UpdateTalkRoomForm } from './TalkRoomModalForms'
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

    componentDidMount() {
        this.props.getOwnRooms()
        this.props.getJoinRooms()
    }


    render() {
        return (
            <Container>
                <TalkRoomAreaLabel userName={this.props.loginUser.name} text="さんが作成したトークルーム" />
                <Button variant="primary" onClick={() => this.props.showModalOf("createTalkRoomModalForm")}>トークルームを追加</Button>
                <TalkRoomsArea talkRoomIds={this.props.ownRoomIds} />
                <TalkRoomAreaLabel userName={this.props.loginUser.name} text="さんが参加しているトークルーム" />
                <TalkRoomsArea talkRoomIds={this.props.joinRoomIds} readOnly/>
                <CreateTalkRoomForm />
                <UpdateTalkRoomForm />   
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
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
