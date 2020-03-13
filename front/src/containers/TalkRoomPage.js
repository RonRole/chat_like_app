import React from 'react'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { connect } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import TalkRoomsArea from '../components/TalkRoomsArea'
import TalkRoomModalForm from '../components/TalkRoomModalForm'




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
        modalShow : false
    }

    componentDidMount() {
        this.props.getOwnRooms()
        this.props.getJoinRooms()
    }

    render() {
        return (
            <Container>
                <TalkRoomAreaLabel userName={this.props.loginUser.name} text="さんが作成したトークルーム" />
                <Button variant="primary" onClick={() => this.setState({modalShow:true})}>トークルームを追加</Button>
                <TalkRoomsArea talkRoomIds={this.props.ownRoomIds} />
                <TalkRoomAreaLabel userName={this.props.loginUser.name} text="さんが参加しているトークルーム" />
                <TalkRoomsArea talkRoomIds={this.props.joinRoomIds} readOnly/>
                <TalkRoomModalForm show = {this.state.modalShow} cancel={() => this.setState({modalShow:false})} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginUser : state.logReducer.isLoggedIn,
        ownRoomIds : TalkRoomModule.reducer.getOwnRoomIds(state),
        joinRoomIds : TalkRoomModule.reducer.getJoinRoomIds(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOwnRooms : () => dispatch(TalkRoomModule.actions.execGetOwnRooms()),
        getJoinRooms : () => dispatch(TalkRoomModule.actions.execGetJoinedRooms())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TalkRoomPage)