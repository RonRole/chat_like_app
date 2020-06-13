import React from 'react'
import { Modal, ListGroup, Button } from 'react-bootstrap'
import UserProfile from '../components/UserProfile'
import { useSelector } from 'react-redux'



const TalkRoomMembersModal = ({
    show,
    onCancel,
    talkRoomId
}) => {
    const talkRooms=useSelector(state=>state.talkRooms)
    const thisRoom = talkRooms.ownRooms[talkRoomId] || talkRooms.joinRooms[talkRoomId] || talkRooms.default

    const users=useSelector(state=>state.users)
    
    return (
        <Modal show={show}>
            <Modal.Header>
                <strong>{thisRoom.title}のメンバー</strong>
            </Modal.Header>
            <Modal.Body id='talkRoomMembersModalBody'>
                <ListGroup variant='flush'>
                    <ListGroup.Item variant='success'>
                        <strong>管理者</strong>
                        <UserProfile user={users[thisRoom.author_id] || users[0]} without='self_id'/>
                    </ListGroup.Item>
                    {[...new Set(thisRoom.user_ids)].map((userId,index) => (
                        <ListGroup.Item key={index}>
                            <UserProfile user = {users[userId] || users[0]} without='self_id'/>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onCancel}>閉じる</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TalkRoomMembersModal