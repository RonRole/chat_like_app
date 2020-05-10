import React from 'react'
import { Modal, ListGroup, Button } from 'react-bootstrap'
import UserProfile from '../components/UserProfile'
import UserModule from '../modules/userModule/UserModule'
import { connect } from 'react-redux'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'

class TalkRoomMembersModal extends React.Component {

    render() {
        return (
            <Modal show = {this.props.show}>
                <Modal.Header>
                    <strong>{this.props.getTalkRoomById(this.props.talkRoomId).title}のメンバー</strong>
                </Modal.Header>
                <Modal.Body style={{maxHeight:'60vh',overflow:'scroll'}}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item variant='success'>
                            <strong>管理者</strong>
                            <UserProfile user={this.props.getTalkRoomById(this.props.talkRoomId).getAuthor()}/>
                        </ListGroup.Item>
                        {this.props.getTalkRoomById(this.props.talkRoomId).getMembers().map((user,index) => {
                            return (
                                <ListGroup.Item key={index}>
                                    <UserProfile user = {user} />
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={this.props.onCancel}>閉じる</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginUser : state.logStatus.isLoggedIn,
        getUserById : (userId) => UserModule.reducer.getUserById(state)(userId),
        getTalkRoomById : (talkRoomId) => TalkRoomModule.reducer.getTalkRoomById(state)(talkRoomId)
    }
}

export default connect(mapStateToProps)(TalkRoomMembersModal)