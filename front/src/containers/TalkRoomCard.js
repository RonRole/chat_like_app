import React, { useState, useEffect } from "react"
import { Card, Button, Row, Dropdown, Image, OverlayTrigger, Tooltip } from "react-bootstrap"
import {  useSelector, useDispatch } from "react-redux"
import { withRouter } from "react-router-dom"
import TalkRoomMembersModal from "./TalkRoomMembersModal"
import CurrentRoomStatusActions from "../modules/currentRoomStatusModule/CurrentRoomStatusActions"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import RenderByCondition from "../components/RenderByCondition"
import FrontAddress from "../address"
import UserInviteForm from "./UserInviteForm"
import RemoveTalkRoomMembersModal from "./RemoveTalkRoomMemberModal"
import UpdateTalkRoomForm from "./UpdateTalkRoomForm"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"

const TalkRoomParams = ({
    talkRoomId
}) => {
    const talkRoomsStatus = useSelector(state=>state.talkRooms)
    const thisRoom = talkRoomsStatus.joinRooms[talkRoomId] || talkRoomsStatus.ownRooms[talkRoomId] || talkRoomsStatus.default
    return (
        <div className="mb-2 w-100 overflow-auto">
            <Card.Title className='mb-0'><strong>{thisRoom.title}</strong></Card.Title>
            <Card.Text>{thisRoom.description}</Card.Text>
        </div>
    )
}

const CurrentUserThumbs = ({
    talkRoomId
}) => {
    const currentRoomStatus = useSelector(state=>state.currentRoomStatus)
    const userStatus = useSelector(state=>state.users)
    return (
        <TransitionGroup className='d-flex h-px-50'>
            {(currentRoomStatus[talkRoomId] || currentRoomStatus.default).currentUserIds.map((userId,index) => (
                <CSSTransition key={index} classNames='fade' timeout={100}>
                    <Image className='user-thumb-size' src={(userStatus[userId] || userStatus[0]).image.thumb.url}  roundedCircle/>
                </CSSTransition>
            ))}
        </TransitionGroup>
    )
}

const IntoTalkRoomIconComp = ({
    talkRoomId,
    history
}) => {
    return (
        <OverlayTrigger overlay={<Tooltip>入室</Tooltip>}>
            <i className='material-icons pointer opacity-under-mouse font-px-30 text-primary' onClick={()=>{
                history.push(`${FrontAddress.talk_rooms}/${talkRoomId}`)
            }}>sensor_door</i>
        </OverlayTrigger>
    )
}

const IntoTalkRoomIcon = withRouter(IntoTalkRoomIconComp)

const DeleteTalkRoomIcon = ({
    talkRoomId,
    className,
}) => {
    const talkRoomsStatus = useSelector(state=>state.talkRooms)
    const thisRoom = talkRoomsStatus.joinRooms[talkRoomId] || talkRoomsStatus.ownRooms[talkRoomId] || talkRoomsStatus.default
    const dispatch = useDispatch()
    return (
        <OverlayTrigger overlay={<Tooltip>トークルームを削除する</Tooltip>}>
            <i className={`material-icons pointer opacity-under-mouse font-px-30 text-primary ${className}`} onClick={()=>{
                if(!window.confirm(`${thisRoom.title}を削除しますか?`)){
                    return
                }
                dispatch(TalkRoomModule.actions.execDeleteTalkRoom(talkRoomId))
            }}>delete</i>
        </OverlayTrigger>
    )
}

const TalkRoomCardImgComp = ({
    talkRoomId,
    history
}) => {
    const talkRoomsStatus = useSelector(state => state.talkRooms)
    const thisRoom = talkRoomsStatus.joinRooms[talkRoomId] || talkRoomsStatus.ownRooms[talkRoomId] || talkRoomsStatus.default
    return (
        <Card.Img className='h-px-150 contain opacity-under-mouse pointer' src={(thisRoom.image || {}).url} onClick={() => {
            history.push(`${FrontAddress.talk_rooms}/${talkRoomId}`)
        }}/>
    )
}

const TalkRoomCardImg = withRouter(TalkRoomCardImgComp)


const TalkRoomCard = ({
    talkRoomId,
    readOnly
}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(CurrentRoomStatusActions.execRefreshCurrentRoomUserIds({
            talkRoomId
        }))
    },[])
    return (
        <Card>
            <TalkRoomCardImg talkRoomId={talkRoomId} />
            <Card.Body>
                <CurrentUserThumbs talkRoomId={talkRoomId} />
                <TalkRoomParams talkRoomId={talkRoomId} />
                <IntoTalkRoomIcon　talkRoomId={talkRoomId} />
                <TalkRoomMembersModal.ShowIcon talkRoomId={talkRoomId}/>
                <RenderByCondition renderCondition={!readOnly} WrapWith={'span'}>
                    <UserInviteForm.ShowIcon className='text-success' talkRoomId={talkRoomId} />
                    <RemoveTalkRoomMembersModal.ShowIcon className='text-success' talkRoomId={talkRoomId} />
                    <UpdateTalkRoomForm.ShowIcon className='text-success' talkRoomId={talkRoomId} />
                    <DeleteTalkRoomIcon className='text-danger' talkRoomId={talkRoomId} />
                </RenderByCondition>
            </Card.Body>
        </Card>
    )
}

TalkRoomCard.defaultProps = {
    talkRoomId : 0,
    readOnly : false
}

export default TalkRoomCard
