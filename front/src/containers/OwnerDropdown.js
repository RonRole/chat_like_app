import React from "react"
import { Dropdown } from "react-bootstrap"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"
import UpdateTalkRoomForm from "./UpdateTalkRoomForm"
import { connect } from "react-redux"
import UserInviteForm from "./UserInviteForm"
import UserInviteFormNeo from "./UserInviteFormNeo"

/**
 * オーナー専用のドロップダウンメニューでやんす
 * container componentでやんす
 */
class OwnerDropdown extends React.Component {

    state = {
        userInvideModalShow : false,
        updateModalShow : false
    }

    getTalkRoom = (id) => this.props.getTalkRoomById(id)

    render() {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="success">
                    ルーム設定
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item style={{color:"blue"}} onClick={() => this.setState({userInvideModalShow : true})}>誘う</Dropdown.Item>
                    <Dropdown.Item style={{color:"orange"}} onClick={()=>this.setState({updateModalShow : true})}>作り直す</Dropdown.Item>
                    <Dropdown.Item style={{color:"red"}} onClick={()=> {
                        if(!window.confirm(`${this.getTalkRoom(this.props.talkRoomId).title}を削除しますか?`)){
                            return
                        }
                        this.props.destroyTalkRoom(this.props.talkRoomId)
                    }}>消す</Dropdown.Item>
                </Dropdown.Menu>
                <UserInviteFormNeo talkRoomId={this.props.talkRoomId}
                                show = {this.state.userInvideModalShow} 
                                onCancel = {() => {
                                    this.setState({userInvideModalShow:false})
                                }}
                />
                <UpdateTalkRoomForm talkRoomId={this.props.talkRoomId}
                                    show = {this.state.updateModalShow}
                                    onCancel = {() => {
                                        this.setState({updateModalShow:false})
                                    }}
                />
            </Dropdown>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        getTalkRoomById : (id) => TalkRoomModule.reducer.getTalkRoomById(state)(id)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        destroyTalkRoom : (talkRoomId) => {
            dispatch(TalkRoomModule.actions.execDeleteTalkRoom(talkRoomId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerDropdown)