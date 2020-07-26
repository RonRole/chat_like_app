import React from 'react'

import { Container, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import GoogleMap from '../components/GoogleMap'
import styled from 'styled-components'
import UserHeader from '../components/UserHeader'

const StyledTransitionGroup = styled(TransitionGroup)`
    height:100%;
    width:100%;
`

const CurrentUsersMapContainer = ({
    talkRoomId,
    ...props
}) => {
    const currentRoomStatus = useSelector(state=>state.currentRoomStatus)
    const thisRoomStatus = currentRoomStatus[talkRoomId] || currentRoomStatus.default
    const users = useSelector(state=>state.users)
    const userPositions = useSelector(state=>state.userPositions)
    
    return (
        <Container className='mb-2' {...props}>
            {[thisRoomStatus.currentUserIds].flat().map((userId,index) => {
                return (
                    <>
                        <UserHeader userImageUrl={(users[userId] || users[0]).image.thumb.url} userName={(users[userId] || users[0]).name} />
                        <GoogleMap position={(userPositions[userId] || userPositions.default)} height='20vh' />
                    </>
                )
            })}
        </Container>
    )
}
export default styled(CurrentUsersMapContainer)`
    height:${props=>props.height || '100%'};
    width:${props=>props.width || '100%'};
`