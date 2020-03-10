import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import TalkRoomModule from '../../modules/talkRoomModule/TalkRoomModule'
import { connect } from 'react-redux'

const TalkRoomAreaLabel = ({
    userName,
    text
}) => {
    <h6 style={{borderBottom:"1px solid gray"}}>
        <strong>{userName}</strong>{text}
    </h6>
}

class TalkRoomPage extends React.Component {
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
                <TalkRoomAreaLabel userName={this.props.loginUser} text="さんが作成したトークルーム" />
                <Button variant="primary" onClick={() => this.setState({modalShow:true})}>トークルームを追加</Button>
                <TalkRoomsArea talkRoomIds={this.props.ownRoomIds} />
                <TalkRoomAreaLabel userName={this.props.loginUser} text="さんが参加しているトークルーム" />
                <TalkRoomsArea talkRoomIds={this.props.joinRoomIds} />
                <TalkRoomModalForm show = {this.state.modalShow} cancel={this.setState({modalShow:false})} />
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

export default connect(mapStateToProps)(TalkRoomPage)