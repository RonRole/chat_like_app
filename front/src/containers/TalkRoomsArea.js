import React, { useState } from 'react'
import { Pagination, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import TalkRoomCard from './TalkRoomCard'
import SeparateForPagination from '../components/SeparateForPagination'

const OwnRoomsArea = ({
    itemLengthPerPage,
    ...props
}) => {
    const talkRooms = useSelector(state=>state.talkRooms)
    const ownRooms = Object.values(talkRooms.ownRooms)
    return (
        <SeparateForPagination wrapperClassName='row mb-2 clear-exit-anim-children' itemLengthPerPage={itemLengthPerPage} WrapWith={TransitionGroup} {...props}>
            {ownRooms.map((ownRoom,index) => (
                <CSSTransition timeout={100} className='mb-2' classNames='fade' key={index}>
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
    itemLengthPerPage,
    ...props
}) => {
    const joinRooms = useSelector(state=>state.talkRooms.joinRooms)
    const joinRoomArray = Object.values(joinRooms)
    return (
        <SeparateForPagination wrapperClassName='row mb-2 clear-exit-anim-children' itemLengthPerPage={itemLengthPerPage} WrapWith={TransitionGroup} {...props}>
            {joinRoomArray.map((joinRoom,index) => (
                <CSSTransition timeout={100} className='mb-2' classNames='fade' key={index}>
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