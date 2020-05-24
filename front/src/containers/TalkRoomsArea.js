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
    const ownRoomArray = Object.keys(ownRooms).map(key=>ownRooms[key])
    const [selectedPage, setSelectedPage] = useState(1)
    return (
        <>
            <SeparateForPagination className='row' WrapWith={TransitionGroup}>
                {ownRoomArray.map((ownRoom,index) => (
                    <CSSTransition timeout={100} classNames='fade' key={index}>
                        <Col md={4}>
                            <TalkRoomCard talkRoomId={ownRoom.id}/>
                        </Col>
                    </CSSTransition>
                ))}
            </SeparateForPagination>
            <Pagination>    
                {[...Array(Math.ceil(ownRoomArray.length/itemLengthPerPage))].map((_, index)=>index+1).map(pageNumber=> (
                    <Pagination.Item key={pageNumber} active={pageNumber===selectedPage} onClick={() => setSelectedPage(pageNumber)}>
                        {pageNumber}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    )
}

OwnRoomsArea.defaultProps = {
    itemLengthPerPage : 3
}

const JoinRoomsArea = ({
    itemLengthPerPage
}) => {
    const joinRooms = useSelector(state=>state.talkRooms.joinRooms)
    const joinRoomArray = Object.keys(joinRooms).map(key=>joinRooms[key])
    const [selectedPage, setSelectedPage] = useState(1)
    return (
        <>
            <SeparateForPagination className='row' wrapWith={TransitionGroup}>
                {joinRoomArray.map((joinRoom,index) => (
                    <CSSTransition timeout={100} classNames='fade' key={index}>
                        <Col md={4}>
                            <TalkRoomCard talkRoomId={joinRoom.id}/>
                        </Col>
                    </CSSTransition>
                ))}
            </SeparateForPagination>
            <Pagination>    
                {[...Array(Math.ceil(joinRoomArray.length/itemLengthPerPage))].map((_, index)=>index+1).map(pageNumber=> (
                    <Pagination.Item key={pageNumber} active={pageNumber===selectedPage} onClick={() => setSelectedPage(pageNumber)}>
                        {pageNumber}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    )
}

JoinRoomsArea.defaultProps = {
    itemLengthPerPage : 3
}


export default OwnRoomsArea