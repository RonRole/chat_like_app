import React, { useState, useEffect } from 'react'
import { Pagination, Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import TalkRoomCard from './TalkRoomCard'
import SeparateForPagination from '../components/SeparateForPagination'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'

const OwnRoomsArea = ({
    itemLengthPerPage,
    ...props
}) => {
    const talkRooms = useSelector(state=>state.talkRooms)
    const ownRooms = Object.values(talkRooms.ownRooms)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(TalkRoomModule.actions.execGetOwnRooms()) 
    },[])
    return (
        <SeparateForPagination wrapperClassName='row mb-2 clear-exit-anim-children' itemLengthPerPage={itemLengthPerPage} WrapWith={TransitionGroup} {...props}>
            {ownRooms.map((ownRoom,index) => (
                <CSSTransition timeout={100} className='mb-2' classNames='fade' key={index}>
                    <Col xs={{span:10, offset:1}} sm={{span:6,offset:0}} md={4} lg={3}>
                        <TalkRoomCard talkRoomId={ownRoom.id} height='20rem'/>
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
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(TalkRoomModule.actions.execGetJoinedRooms()) 
    },[])
    return (
        <SeparateForPagination wrapperClassName='row mb-2 clear-exit-anim-children' itemLengthPerPage={itemLengthPerPage} WrapWith={TransitionGroup} {...props}>
            {joinRoomArray.map((joinRoom,index) => (
                <CSSTransition timeout={100} className='mb-2' classNames='fade' key={index}>
                    <Col xs={{span:10,offset:1}} sm={{span:6,offset:0}} md={4} lg={3}>
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