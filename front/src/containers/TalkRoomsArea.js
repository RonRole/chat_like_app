import React, { useState } from 'react'
import { Pagination, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import TalkRoomCard from './TalkRoomCard'
import SeparateForPagination from '../components/SeparateForPagination'

const OwnRoomsArea = ({
    itemLengthPerPage
}) => {
    const ownRooms = useSelector(state=>state.talkRooms.ownRooms)
    const ownRoomArray = Object.values(ownRooms)

    return (
        <SeparateForPagination className='row mb-2 clear_exit_anim_children' itemLengthPerPage={itemLengthPerPage} WrapWith={TransitionGroup}>
            {ownRoomArray.map((ownRoom,index) => (
                <CSSTransition timeout={100} classNames='fade' key={index}>
                    <Col md={4}>
                        <TalkRoomCard talkRoomId={ownRoom.id}/>
                    </Col>
                </CSSTransition>
            ))}
        </SeparateForPagination>
    )
}

OwnRoomsArea.defaultProps = {
    itemLengthPerPage : 3
}

const JoinRoomsArea = ({
    itemLengthPerPage
}) => {
    const joinRooms = useSelector(state=>state.talkRooms.joinRooms)
    const joinRoomArray = Object.values(joinRooms)

    return (
        <SeparateForPagination className='row mb-2 clear_exit_anim_children' itemLengthPerPage={itemLengthPerPage} WrapWith={TransitionGroup}>
            {joinRoomArray.map((joinRoom,index) => (
                <CSSTransition timeout={100} classNames='fade' key={index}>
                    <Col md={4}>
                        <TalkRoomCard talkRoomId={joinRoom.id} readOnly/>
                    </Col>
                </CSSTransition>
            ))}
        </SeparateForPagination>
    )
}

JoinRoomsArea.defaultProps = {
    itemLengthPerPage : 3
}

const TalkRoomsArea = {
    OwnRoomsArea,
    JoinRoomsArea
}


export default TalkRoomsArea