import React, { useState } from 'react'
import { Modal, ListGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import UserProfile from '../components/UserProfile'
import { useSelector } from 'react-redux'



const TalkRoomMembersModal = ({
    show,
    onHide,
    talkRoomId
}) => {
    const talkRooms=useSelector(state=>state.talkRooms)
    const thisRoom = talkRooms.ownRooms[talkRoomId] || talkRooms.joinRooms[talkRoomId] || talkRooms.default
    const users=useSelector(state=>state.users)
    return (
        <Modal show={show}　onHide={onHide} scrollable>
            <Modal.Header closeButton>
                <strong>{thisRoom.title}のメンバー</strong>
            </Modal.Header>
            <Modal.Body>
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
                <Button variant='secondary' onClick={onHide}>閉じる</Button>
            </Modal.Footer>
        </Modal>
    )
}

const ShowButton = ({
    talkRoomId
}) => {
    const [showTalkRoomMemberModal, setShowTalkRoomMemberModal] = useState(false)
    return (
        <>
            <Button size='sm' onClick={()=>setShowTalkRoomMemberModal(true)}>メンバー一覧</Button>
            <TalkRoomMembersModal show={showTalkRoomMemberModal} talkRoomId={talkRoomId} onHide={() => setShowTalkRoomMemberModal(false)}/>
        </>
    )
}
TalkRoomMembersModal.ShowButton = ShowButton

const ShowIcon = ({
    talkRoomId
}) => {
    const [showTalkRoomMemberModal, setShowTalkRoomMemberModal] = useState(false)
    return (
        <>
            <OverlayTrigger overlay={<Tooltip>メンバー一覧</Tooltip>}>
                <i className='material-icons pointer opacity-under-mouse font-px-30 text-primary' onClick={() => {
                    setShowTalkRoomMemberModal(true)
                }}>people</i>
            </OverlayTrigger>
            <TalkRoomMembersModal show={showTalkRoomMemberModal} talkRoomId={talkRoomId} onHide={() => setShowTalkRoomMemberModal(false)}/>
        </>
    )
}
TalkRoomMembersModal.ShowIcon = ShowIcon


export default TalkRoomMembersModal