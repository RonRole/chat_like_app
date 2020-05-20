import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import CurrentUserStatusThumb from './CurrentUserStatusThumb'
import { withRouter } from 'react-router-dom'


const CurrentUsersContainer = ({
    match
}) => {
    const currentRoomStatus = useSelector(state=>state.currentRoomStatus)
    const thisRoomStatus = currentRoomStatus[match.params.id] || currentRoomStatus[0]
    return (
        <Container className='current_users_container mb-2'>
            <h6><strong>今いる人たち</strong></h6>
            <TransitionGroup>
                {[thisRoomStatus.currentUserIds].flat().map((id,index) => {
                    return (
                        <CSSTransition key={index} timeout={100} classNames="fade">
                            <CurrentUserStatusThumb talkRoomId={match.params.id} userId={id} />     
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        </Container>
    )
}
export default withRouter(CurrentUsersContainer)