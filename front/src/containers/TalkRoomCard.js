import React from "react"
import { Card, Button, Row, Dropdown, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"
import { connect } from "react-redux"
import UserModule from "../modules/userModule/UserModule"
import ModalModule from "../modules/ModalModule/ModalModule"
import UpdateTalkRoomForm from "./UpdateTalkRoomForm"
import OwnerDropdown from "./OwnerDropdown"


const OwnerMenu = ({
    onInviteButtonClick,
    onUpdateButtonClick,
    onDestroyButtonClick
}) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success">
                管理者の特権
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item style={{color:"blue"}} onClick={onInviteButtonClick}>誘う</Dropdown.Item>
                <Dropdown.Item style={{color:"orange"}} onClick={onUpdateButtonClick}>作り直す</Dropdown.Item>
                <Dropdown.Item style={{color:"red"}} onClick={onDestroyButtonClick}>消す</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

class TalkRoomCard extends React.Component {

    getTalkRoom = (id) => this.props.getTalkRoomById(id)

    componentDidMount() {
        this.props.getMembers(this.props.id)
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <div className="d-flex" style={{width:"100%"}}>
                        <div className="mr-2" style={{width:"100%", overflow:"auto"}}>
                            <Card.Title><strong>{this.getTalkRoom(this.props.id).title}</strong></Card.Title>
                            <Card.Text>{this.getTalkRoom(this.props.id).description}</Card.Text>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mb-2">
                        <Link className="btn btn-primary" to={`/talk_rooms/${this.props.id}`}>入る</Link>
                    </div>
                    <div className="d-flex justify-content-end">
                        {[this.props.readOnly].filter(readOnly => !readOnly).map((readOnly,index) => {
                            return (
                               <OwnerDropdown key={index} talkRoomId={this.props.id}/>
                            )    
                        })}
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TalkRoomCard)