import React from 'react'

import { Container, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import GoogleMap from '../components/GoogleMap'


const CurrentUsersMapContainer = ({
    talkRoomId
}) => {
    const currentRoomStatus = useSelector(state=>state.currentRoomStatus)
    const thisRoomStatus = currentRoomStatus[talkRoomId] || currentRoomStatus.default
    const users = useSelector(state=>state.users)
    const userPositions = useSelector(state=>state.userPositions)
    
    return (
        <Container className='mb-2'>
            <TransitionGroup>
                {[thisRoomStatus.currentUserIds].flat().map((userId,index) => {
                    return (
                        <CSSTransition key={index} timeout={100} classNames="fade">
                            <div className='d-block'>
                                <div>
                                    <Image src = {(users[userId] || users[0]).image.thumb.url} roundedCircle/>
                                    <strong>{(users[userId] || users[0]).name}</strong>
                                </div>
                                <GoogleMap position={(userPositions[userId] || userPositions.default)}/>
                            </div>
                        </CSSTransition>

                    )
                })}
            </TransitionGroup>
        </Container>
    )
}
export default CurrentUsersMapContainer