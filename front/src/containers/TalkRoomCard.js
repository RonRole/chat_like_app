import React, { useState, useEffect, useRef } from "react"
import { Card, Button, Row, Dropdown, Image, OverlayTrigger, Tooltip } from "react-bootstrap"
import {  useSelector, useDispatch } from "react-redux"

import { withRouter } from "react-router-dom"
import TalkRoomMembersModal from "./TalkRoomMembersModal"
import CurrentRoomStatusActions from "../modules/currentRoomStatusModule/CurrentRoomStatusActions"
import { TransitionGroup, CSSTransition } from "react-transition-group"

import FrontAddress from "../address"
import UserInviteForm from "./UserInviteForm"
import RemoveTalkRoomMembersModal from "./RemoveTalkRoomMemberModal"
import UpdateTalkRoomForm from "./UpdateTalkRoomForm"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"
import Visible from "../style-components/Visible"
import styled from "styled-components"
import OpacityIterate from "../style-components/OpacityIterate"
import FontSize from "../style-components/FontSize"
import Size from "../style-components/Size"
import UserImage from "./UserImage"


const TalkRoomCardTitle = styled(Card.Title)`
    margin:0;
    height:${props=>props.height};
    overflow:auto;
    font-size:${props=>props.fontSize};
`

const TalkRoomCardText = styled(Card.Text)`
    height:${props=>props.height};
    overflow:auto;
    font-size:${props=>props.fontSize}
`

const CardTextLine = styled.p`
    margin : 0;
    padding : 0;
`

const TalkRoomParams = ({
    talkRoomId,
    ...props
}) => {
    const talkRoomsStatus = useSelector(state=>state.talkRooms)
    const thisRoom = talkRoomsStatus.joinRooms[talkRoomId] || talkRoomsStatus.ownRooms[talkRoomId] || talkRoomsStatus.default
    return (
        <Size {...props}>
            <TalkRoomCardTitle height='1.5rem' fontSize='.9rem'><strong>{thisRoom.title}</strong></TalkRoomCardTitle>
            <TalkRoomCardText as='div' height='calc(100% - 1.5rem)' fontSize='0.8rem'>
                {thisRoom.description.split('\n').map((textline,index)=> {
                    return <CardTextLine key={index}>{textline}</CardTextLine>
                })}
            </TalkRoomCardText>
        </Size>
    )
}

const CurrentUserThumbs = ({
    talkRoomId,
    size,
    ...props
}) => {
    const currentRoomStatus = useSelector(state=>state.currentRoomStatus)
    return (
        <Size height={size} {...props}>
            {(currentRoomStatus[talkRoomId] || currentRoomStatus.default).currentUserIds.map((userId,index) => (
                <CSSTransition key={index} classNames='fade' timeout={100}>
                    <UserImage userId={userId} height='100%' width={size} roundedCircle thumb/>
                </CSSTransition>
            ))}
        </Size>
    )
}

const IntoTalkRoomIconComp = ({
    talkRoomId,
    history
}) => {
    return (
        <OpacityIterate as='span'>
            <OverlayTrigger overlay={<Tooltip>入室</Tooltip>}>
                <i className='material-icons text-primary' onClick={()=>{
                    history.push(`${FrontAddress.talk_rooms}/${talkRoomId}`)
                }}>sensor_door</i>
            </OverlayTrigger>
        </OpacityIterate>
    )
}

const IntoTalkRoomIcon = withRouter(IntoTalkRoomIconComp)

const DeleteTalkRoomIcon = ({
    talkRoomId,
    ...props
}) => {
    const talkRoomsStatus = useSelector(state=>state.talkRooms)
    const thisRoom = talkRoomsStatus.joinRooms[talkRoomId] || talkRoomsStatus.ownRooms[talkRoomId] || talkRoomsStatus.default
    const dispatch = useDispatch()
    return (
        <OpacityIterate as='span' {...props}>
            <OverlayTrigger overlay={<Tooltip>トークルームを削除する</Tooltip>}>
                <i className='material-icons' onClick={()=>{
                    if(!window.confirm(`${thisRoom.title}を削除しますか?`)){
                        return
                    }
                    dispatch(TalkRoomModule.actions.execDeleteTalkRoom(talkRoomId))
                }}>delete</i>
            </OverlayTrigger>
        </OpacityIterate>
    )
}

const TalkRoomCardImgComp = ({
    talkRoomId,
    history,
    ...props
}) => {
    const talkRoomsStatus = useSelector(state => state.talkRooms)
    const thisRoom = talkRoomsStatus.joinRooms[talkRoomId] || talkRoomsStatus.ownRooms[talkRoomId] || talkRoomsStatus.default
    return (
        <Card.Img src={(thisRoom.image || {}).url} onClick={() => {
            history.push(`${FrontAddress.talk_rooms}/${talkRoomId}`)
        }} {...props}/>
    )
}

const TalkRoomCardImg = withRouter(TalkRoomCardImgComp)

const StyledTalkRoomCardImg = styled(TalkRoomCardImg)`
    object-fit: contain;
    height:${props=>props.height};
    transition:opacity 0.2s ease;
    cursor: pointer;
    :hover {
        opacity:0.5;
        transition:opacity 0.2s ease;
    }
`

const StyledCardBody = styled(Card.Body)`
    height:${props=>props.height};
`

const StyledCard = styled(Card)`
    height:${props => props.size}rem;
    transition: all 0.2s;
    &:hover {
        border-color : orange;
        transform: scale(1.1, 1.1);
        transition: all 0.2s;
    }
`


const TalkRoomCard = ({
    talkRoomId,
    height,
    readOnly,
    ...props
}) => {
    const cardBodyRef = useRef()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(CurrentRoomStatusActions.execRefreshCurrentRoomUserIds({
            talkRoomId
        }))
    },[])

    return (
        <StyledCard size={20} {...props}>
            <StyledTalkRoomCardImg talkRoomId={talkRoomId} height='40%'/>
            <StyledCardBody ref={cardBodyRef} height='60%'>
                <CurrentUserThumbs size='25%' talkRoomId={talkRoomId} className='d-flex overflow-auto'/>
                <TalkRoomParams talkRoomId={talkRoomId} height='65%'/>
                <Size height='15%'>
                    <FontSize as='span' size='1.5rem'>
                        <IntoTalkRoomIcon　talkRoomId={talkRoomId} />
                        <TalkRoomMembersModal.ShowIcon talkRoomId={talkRoomId}/>
                        <Visible as='span' aria-hidden={readOnly}>
                                <UserInviteForm.ShowIcon className='text-success' talkRoomId={talkRoomId} />
                                <RemoveTalkRoomMembersModal.ShowIcon className='text-success' talkRoomId={talkRoomId} />
                                <UpdateTalkRoomForm.ShowIcon className='text-success' talkRoomId={talkRoomId} />
                                <DeleteTalkRoomIcon className='text-danger' talkRoomId={talkRoomId} />                    
                        </Visible>
                    </FontSize>
                </Size>
            </StyledCardBody>
        </StyledCard>
    )
}

TalkRoomCard.defaultProps = {
    talkRoomId : 0,
    readOnly : false
}

export default TalkRoomCard
