import React from "react"
import { Card, Button, Row, Dropdown, Image } from "react-bootstrap"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"
import { connect } from "react-redux"
import UserModule from "../modules/userModule/UserModule"
import OwnerDropdown from "./OwnerDropdown"
import { withRouter } from "react-router-dom"
import TalkRoomMembersModal from "./TalkRoomMembersModal"

class TalkRoomCard extends React.Component {

    state = {
        talkRoomMemberShow : false
    }

    getTalkRoom = (id) => this.props.getTalkRoomById(id)
    getUser = (id) => this.props.getUserById(id)

    render() {
        return (
            <Card>
                <Card.Body>
                    <div className="d-flex" style={{width:"100%"}}>
                        <div className="mr-2" style={{width:"100%", overflow:"auto"}}>
                            <Card.Title><strong>{this.getTalkRoom(this.props.id).title}</strong></Card.Title>
                            <Card.Text>{this.getTalkRoom(this.props.id).description}</Card.Text>
                        </div>
                        <Image style={{width:'50px', height:'50px'}} src={this.getTalkRoom(this.props.id).getAuthor().image.thumb.url}  roundedCircle/>
                    </div>
                    <div className="d-flex justify-content-end mb-2">
                        <Button size='sm' className="mr-2" onClick={()=>this.props.history.push(`/talk_rooms/${this.props.id}`)}>入る</Button>
                        <Button size='sm' onClick={()=>this.setState({talkRoomMemberShow : true})}>メンバー一覧</Button>
                    </div>
                    <div className="d-flex justify-content-end">
                        {[this.props.readOnly].filter(readOnly => !readOnly).map((_,index) => {
                            return (
                               <OwnerDropdown key={index} talkRoomId={this.props.id}/>
                            )    
                        })}
                    </div>
                    <TalkRoomMembersModal show={this.state.talkRoomMemberShow} talkRoomId={this.props.id} onCancel={() => this.setState({talkRoomMemberShow:false})}/>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state : state,
        getTalkRoomById : (id) => TalkRoomModule.reducer.getTalkRoomById(state)(id),
        getUserById : (id) => UserModule.reducer.getUserById(state)(id)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMembers : (talkRoomId) => {
            dispatch(TalkRoomModule.actions.execGetTalkRoomUser(talkRoomId))
        },
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TalkRoomCard))
