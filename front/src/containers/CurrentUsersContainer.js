import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import CurrentUserStatusThumb from './CurrentUserStatusThumb'



const CurrentUsersContainer = ({
    talkRoomId
}) => {
    const currentRoomStatus = useSelector(state=>state.currentRoomStatus)
    const thisRoomStatus = currentRoomStatus[talkRoomId] || currentRoomStatus.default
    return (
        <Container className='current_users_container mb-2'>
            <h6><strong>今いる人たち</strong></h6>
            <TransitionGroup className='d-flex'>
                {[thisRoomStatus.currentUserIds].flat().map((userId,index) => {
                    return (
                        <CSSTransition key={index} timeout={100} classNames="fade">
                            <CurrentUserStatusThumb talkRoomId={talkRoomId} userId={userId} />     
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        </Container>
    )
}
export default CurrentUsersContainer