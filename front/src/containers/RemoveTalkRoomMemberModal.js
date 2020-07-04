import { useDispatch, useSelector } from "react-redux"
import ModalForm from "../components/ModalForm"
import React, { useState } from 'react'
import { ListGroup, Modal, Button } from "react-bootstrap"
import UserProfile from "../components/UserProfile"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"
import { TransitionGroup, CSSTransition } from "react-transition-group"

const RemoveTalkRoomMembersModal = ({
    talkRoomId,
    show,
    onCancel
}) => {
    const dispatch = useDispatch()
    const talkRooms=useSelector(state=>state.talkRooms)
    const thisRoom = talkRooms.ownRooms[talkRoomId] || talkRooms.joinRooms[talkRoomId] || talkRooms.default
    const users=useSelector(state=>state.users)
    const [selectedUserIds, addSelectedUserId] = useState({})
    return (
        <ModalForm show={show} onSubmit={(e) => {
            e.preventDefault()
            dispatch(TalkRoomModule.actions.execRemoveUsersFromTalkRoom({
                talkRoomId,
                userIds : Object.keys(selectedUserIds).map(userId => parseInt(userId))
            }))
        }}>
            <Modal.Header>
                <h6><strong>「{thisRoom.title}」から別れるメンバーを選択してください</strong></h6>
            </Modal.Header>
            <Modal.Body id='talkRoomMembersModalBody'>
                <ListGroup variant='flush'>
                    <TransitionGroup>
                        {[...new Set(thisRoom.user_ids)].map((userId,index) => (
                            <CSSTransition key={index} timeout={200} classNames='fade'>
                                <ListGroup.Item variant={selectedUserIds[userId]} className='pointer opacity-iterate' onClick={() => {
                                    selectedUserIds[userId] ? delete selectedUserIds[userId] : selectedUserIds[userId] = 'danger'
                                    addSelectedUserId({
                                        ...selectedUserIds
                                    })
                                }}>
                                    <UserProfile user = {users[userId] || users[0]} without='self-id'/>
                                </ListGroup.Item>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' type='submit' disabled={Object.keys(selectedUserIds).length===0}>別れる</Button>
                <Button variant='secondary' onClick={()=>{
                    addSelectedUserId({})
                    onCancel()}}
                >閉じる</Button>
            </Modal.Footer>
        </ModalForm>
    )
}

export default RemoveTalkRoomMembersModal