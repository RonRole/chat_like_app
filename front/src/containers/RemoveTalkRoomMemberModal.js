import { useDispatch, useSelector } from "react-redux"
import ModalForm from "../components/ModalForm"
import React, { useState } from 'react'
import { ListGroup, Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import UserProfile from "./UserProfile"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import OpacityIterate from "../style-components/OpacityIterate"

const RemoveTalkRoomMembersModal = ({
    talkRoomId,
    show,
    onHide
}) => {
    const dispatch = useDispatch()
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    const talkRooms=useSelector(state=>state.talkRooms)
    const thisRoom = talkRooms.ownRooms[talkRoomId] || talkRooms.joinRooms[talkRoomId] || talkRooms.default
    const [selectedUserIds, addSelectedUserId] = useState({})
    return (
        <ModalForm show={show} onHide={onHide} onSubmit={(e) => {
            e.preventDefault()
            dispatch(TalkRoomModule.actions.execRemoveUsersFromTalkRoom({
                authorId : loginUser.id,
                talkRoomId,
                userIds : Object.keys(selectedUserIds).map(userId => parseInt(userId))
            }))
        }}>
            <Modal.Header closeButton>
                <h6><strong>「{thisRoom.title}」から別れるメンバーを選択してください</strong></h6>
            </Modal.Header>
            <Modal.Body id='talkRoomMembersModalBody'>
                <ListGroup variant='flush'>
                    <TransitionGroup>
                        {[...new Set(thisRoom.user_ids)].map((userId,index) => (
                            <CSSTransition key={index} timeout={200} classNames='fade'>
                                <OpacityIterate>
                                    <ListGroup.Item variant={selectedUserIds[userId]} onClick={() => {
                                        selectedUserIds[userId] ? delete selectedUserIds[userId] : selectedUserIds[userId] = 'danger'
                                        addSelectedUserId({
                                            ...selectedUserIds
                                        })
                                    }}>
                                        <UserProfile userId={userId} without='self-id' className='d-flex justify-content-center'/>    
                                    </ListGroup.Item>
                                </OpacityIterate>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' type='submit' disabled={Object.keys(selectedUserIds).length===0}>別れる</Button>
                <Button variant='secondary' onClick={()=>{
                    addSelectedUserId({})
                    onHide()}}
                >閉じる</Button>
            </Modal.Footer>
        </ModalForm>
    )
}

const ShowIcon = ({
    talkRoomId,
    onClick=()=>{},
    ...props
}) => {
    const [removeUserModalShow, changeRemoveUserModalShow] = useState(false)
    return (
        <>
            <OpacityIterate as='span' {...props}>
                <OverlayTrigger overlay={<Tooltip>ユーザーを削除する</Tooltip>}>
                    <i className='material-icons' onClick={(e)=>{
                        onClick(e)
                        changeRemoveUserModalShow(true)
                    }}>person_remove</i>
                </OverlayTrigger>
            </OpacityIterate>
            <RemoveTalkRoomMembersModal show={removeUserModalShow} talkRoomId={talkRoomId} onHide={()=>changeRemoveUserModalShow(false)}/>
        </>
    )
}

RemoveTalkRoomMembersModal.ShowIcon = ShowIcon

export default RemoveTalkRoomMembersModal