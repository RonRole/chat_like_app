import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import CurrentUserStatusThumb from './CurrentUserStatusThumb'
import styled from 'styled-components'



const CurrentUsersContainer = ({
    talkRoomId,
    ...props
}) => {
    const currentRoomStatus = useSelector(state=>state.currentRoomStatus)
    const thisRoomStatus = currentRoomStatus[talkRoomId] || currentRoomStatus.default
    return (
        <Container {...props}>
            <TransitionGroup className='d-flex align-items-center' component='div'>
                {[thisRoomStatus.currentUserIds].flat().map((userId,index) => {
                    return (
                        <CSSTransition key={index} timeout={100} classNames="fade">
                            <CurrentUserStatusThumb talkRoomId={talkRoomId} userId={userId} height='2.5rem' width='2.5rem'/>     
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        </Container>
    )
}

CurrentUsersContainer.Fixed = styled(CurrentUsersContainer)`
    height:${props => props.height};
    width:${props => props.width};
    position : fixed;
    padding : 0;
    margin : 0;
    background-color: rgba(255,255,255,0.8);
    z-index: 1;
`

export default styled(CurrentUsersContainer)`
    height:${props => props.height};
    width:${props => props.width};
    border:1px solid gray;
`