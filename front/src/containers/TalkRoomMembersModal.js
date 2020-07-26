import React, { useState } from 'react'
import { Modal, ListGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import UserProfile from './UserProfile'
import { useSelector } from 'react-redux'
import OpacityIterate from '../style-components/OpacityIterate'



const TalkRoomMembersModal = ({
    show,
    onHide,
    talkRoomId
}) => {
    const talkRooms=useSelector(state=>state.talkRooms)
    const thisRoom = talkRooms.ownRooms[talkRoomId] || talkRooms.joinRooms[talkRoomId] || talkRooms.default
    return (
        <Modal show={show}　onHide={onHide} scrollable>
            <Modal.Header closeButton>
                <strong>{thisRoom.title}のメンバー</strong>
            </Modal.Header>
            <Modal.Body>
                <ListGroup variant='flush'>
                    <ListGroup.Item variant='success'>
                        <strong>管理者</strong>
                        <UserProfile userId={thisRoom.author_id} without='self_id' className='d-flex'/>
                    </ListGroup.Item>
                    {[...new Set(thisRoom.user_ids)].map((userId,index) => (
                        <ListGroup.Item key={index}>
                            <UserProfile userId={userId} without='self_id' className='d-flex'/>
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
            <OpacityIterate as='span'>
                <OverlayTrigger overlay={<Tooltip>メンバー一覧</Tooltip>}>
                    <i className='material-icons text-primary' onClick={() => {
                        setShowTalkRoomMemberModal(true)
                    }}>people</i>            
                </OverlayTrigger>
            </OpacityIterate>
            <TalkRoomMembersModal show={showTalkRoomMemberModal} talkRoomId={talkRoomId} onHide={() => setShowTalkRoomMemberModal(false)}/>
        </>
    )
}
TalkRoomMembersModal.ShowIcon = ShowIcon


export default TalkRoomMembersModal